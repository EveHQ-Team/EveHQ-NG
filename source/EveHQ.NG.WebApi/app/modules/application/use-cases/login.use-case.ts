import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Action,
	select,
	Store,
	createSelector,
	createFeatureSelector
	} from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationUser } from 'modules/application/models/application-user';
import { StartupUseCaseActionTypes, LoginUser } from 'modules/application/use-cases/startup.use-case';
import { AuthenticationService } from 'modules/backend/application/authentication.service';
import { AuthenticationModuleState } from 'modules/authentication/authentication.store';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';

export enum LoginUseCaseActionTypes {
	SetUserToAuthenticate = '[LOGIN USE CASE] Set User To Authenticate',
	LoginRedirect = '[LOGIN USE CASE] Login Redirect',
	AuthenticateWithPassword = '[LOGIN USE CASE] Authenticate With Password',
	LoginSuccess = '[LOGIN USE CASE] Login Success',
	LoginFail = '[LOGIN USE CASE] Login Fail',
}

export class SetUserToAuthenticate implements Action {
	public readonly type: string = LoginUseCaseActionTypes.SetUserToAuthenticate;

	constructor(public payload: ApplicationUser) {
	}
}

export class LoginRedirect implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginRedirect;
	public payload?: any;
}

export class AuthenticateWithPassword implements Action {
	public readonly type: string = LoginUseCaseActionTypes.AuthenticateWithPassword;

	constructor(public payload: string) {
	}
}

export class LoginSuccess implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginSuccess;

	constructor(public payload: ApplicationUser) {
	}
}

export class LoginFail implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginFail;

	constructor(public payload: any) {
	}
}

export type LoginUseCaseActions =
	| SetUserToAuthenticate
	| LoginRedirect
	| AuthenticateWithPassword
	| LoginSuccess
	| LoginFail;

export function loginUseCaseReducer(state = initialState, action: LoginUseCaseActions): LoginUseCaseState {
	switch (action.type) {
		case LoginUseCaseActionTypes.SetUserToAuthenticate:
		{
			const user = action.payload as ApplicationUser;
			return { ...state, user: user };
		}

		case LoginUseCaseActionTypes.LoginFail:
		{
			const error = action.payload as string;
			return { ...state, error: error };
		}

		default:
			return state;
	}
}

@Injectable()
export class LoginUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<ApplicationState>,
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router) {
	}

	@Effect()
	public loginUser$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.LoginUser),
		map((action: LoginUser) => action.payload),
		map((user: ApplicationUser) => {
				return user.isAuthenticationRequired
							? [new SetUserToAuthenticate(user), new LoginRedirect()]
							: new LoginSuccess(user);
			}
		)
	);

	@Effect({ dispatch: false })
	public loginRedirect$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginRedirect),
		tap(() => this.router.navigate(['/authentication/login']))
	);

	@Effect()
	public authenticateWithPassword$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.AuthenticateWithPassword),
		map((action: AuthenticateWithPassword) => action.payload),
		map((password: string) => {
			mergeMap(() => this.authenticationService.login(password).pipe(
				map((isAuthenticated: boolean) =>
					this.store.pipe(
						select(getUserToAuthenticate),
						map(user => isAuthenticated ? new LoginSuccess(user!) : _throw('Login failed. Password is incorrect.'))
					)),
				catchError(error => of(new LoginFail(error)))
			));
		}));
}

export interface LoginUseCaseState {
	user: ApplicationUser | undefined;
	error: string | undefined;
}

const initialState: LoginUseCaseState = {
	user: undefined,
	error: undefined
};

export const selectAuthenticationModuleState = createFeatureSelector<AuthenticationModuleState>('users');
export const selectLoginUseCaseState = createSelector(
	selectAuthenticationModuleState,
	(state: AuthenticationModuleState) => state.loginUseCaseState);

export const getUserToAuthenticate = createSelector(
	selectLoginUseCaseState,
	(state: LoginUseCaseState) => state.user);
