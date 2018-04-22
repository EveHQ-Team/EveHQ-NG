import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Action,
	select,
	Store,
	} from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationUser } from 'modules/application/models/application-user';
import { StartupUseCaseActionTypes, LoginUser } from 'modules/application/use-cases/startup.use-case';
import { AuthenticationService } from 'modules/backend/application/authentication.service';
import { ApplicationState, getUserToAuthenticate } from 'modules/application/application.state';

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
	public payload?: any;
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

export interface LoginUseCaseState {
	userToAuthenticate: ApplicationUser | undefined;
	isUserAuthenticated: boolean;
	error: string | undefined;
}

const initialState: LoginUseCaseState = {
	userToAuthenticate: undefined,
	isUserAuthenticated: false,
	error: undefined
};

export function loginUseCaseReducer(state = initialState, action: LoginUseCaseActions): LoginUseCaseState {
	switch (action.type) {
		case LoginUseCaseActionTypes.SetUserToAuthenticate:
		{
			const user = action.payload as ApplicationUser;
			return { ...state, userToAuthenticate: user };
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
		mergeMap(() => this.store.pipe(
			select(getUserToAuthenticate),
			map(user => user!.isAuthenticationRequired ? new LoginRedirect() : new LoginSuccess())
		)));

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
						map(user => isAuthenticated ? new LoginSuccess() : _throw('Login failed. Password is incorrect.'))
					)),
				catchError(error => of(new LoginFail(error)))
			));
		}));
}
