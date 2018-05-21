import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { Action, select, Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationUser } from 'modules/application/models/application-user';
import { AuthenticationService } from 'modules/backend/application/authentication.service';
import { ApplicationState, SetCurrentUser, ApplicationStore } from 'modules/application/stores/application.state';

export enum LoginUseCaseActionTypes {
	LoginUser = '[LOGIN USE CASE] Login User',
	SetUserToAuthenticate = '[LOGIN USE CASE] Set User To Authenticate',
	LoginRedirect = '[LOGIN USE CASE] Login Redirect',
	AuthenticateWithPassword = '[LOGIN USE CASE] Authenticate With Password',
	LoginSuccess = '[LOGIN USE CASE] Login Success',
	LoginFail = '[LOGIN USE CASE] Login Fail',
}

export class LoginUser implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginUser;

	constructor(public payload: { userToAuthenticate: ApplicationUser }) {}
}

export class SetUserToAuthenticate implements Action {
	public readonly type: string = LoginUseCaseActionTypes.SetUserToAuthenticate;

	constructor(public payload: { userToAuthenticate: ApplicationUser }) {}
}

export class LoginRedirect implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginRedirect;
}

export class AuthenticateWithPassword implements Action {
	public readonly type: string = LoginUseCaseActionTypes.AuthenticateWithPassword;

	constructor(public payload: { password: string }) {}
}

export class LoginSuccess implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginSuccess;
}

export class LoginFail implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginFail;

	constructor(public payload: { error: string }) {}
}

export type LoginUseCaseActions =
	| LoginUser
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
			return { ...state, userToAuthenticate: (action as SetUserToAuthenticate).payload.userToAuthenticate };

		case LoginUseCaseActionTypes.LoginSuccess:
			return { ...state, error: undefined };

		case LoginUseCaseActionTypes.LoginFail:
			return { ...state, error: (action as LoginFail).payload.error };

		default:
			return state;
	}
}

export interface LoginUseCaseStore extends ApplicationStore {
	useCase: LoginUseCaseState
}

export const loginUseCaseReducers = {
	useCase: loginUseCaseReducer
};

const getLoginUseCaseState = createFeatureSelector<LoginUseCaseStore>('loginUseCase');
const getUseCaseState = createSelector(getLoginUseCaseState, state => state.useCase);
export const getUserToAuthenticate = createSelector(getUseCaseState, (state: LoginUseCaseState) => state.userToAuthenticate);
export const getError = createSelector(getUseCaseState, (state: LoginUseCaseState) => state.error);

@Injectable()
export class LoginUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly useCaseStore: Store<LoginUseCaseState>,
		private readonly applicationStore: Store<ApplicationState>,
		private readonly authenticationService: AuthenticationService,
		private readonly router: Router) {}


	@Effect()
	public loginUser$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginUser),
		map((action: LoginUser) => action.payload.userToAuthenticate),
		mergeMap(userToAuthenticate => userToAuthenticate.isAuthenticationRequired
										? from([
											new SetUserToAuthenticate({ userToAuthenticate: userToAuthenticate }),
											new LoginRedirect()
										])
										: of(new LoginSuccess())));

	@Effect({ dispatch: false })
	public loginRedirect$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginRedirect),
		tap(() => this.router.navigate(['/authentication/login']))
	);

	@Effect()
	public authenticateWithPassword$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.AuthenticateWithPassword),
		map((action: AuthenticateWithPassword) => action.payload.password),
		mergeMap(password => this.authenticationService.login(password).pipe(
			mergeMap((isAuthenticated: boolean) => this.useCaseStore.pipe(
					select(getUserToAuthenticate),
					mergeMap(((authenticatedUser: ApplicationUser) =>
							isAuthenticated
							? from([new SetCurrentUser({ user: authenticatedUser }), new LoginSuccess()])
							: of(new LoginFail({ error: 'TODO: some error' })))
					))
			))));

	private selectAuthenticateWithPasswordAction(isAuthenticated: boolean): any {
		console.warn(`isAuthenticated: ${isAuthenticated}`);
		if (!isAuthenticated) {
			return new LoginFail({ error: 'TODO: some error' });
		}

		return this.useCaseStore.select(getUserToAuthenticate).map(
			(authenticatedUser: ApplicationUser) => new SetCurrentUser({ user: authenticatedUser }));
	}
}
