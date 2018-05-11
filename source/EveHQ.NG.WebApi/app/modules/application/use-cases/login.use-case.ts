import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action, select, Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { ApplicationUser } from 'modules/application/models/application-user';
import { AuthenticationService } from 'modules/backend/application/authentication.service';
import { StartupUseCaseActionTypes } from 'modules/application/use-cases/startup.use-case';
//import { MainState, getUserToAuthenticate } from 'modules/application/stores/main.state';
import { ApplicationStore } from 'modules/application/stores/application.state';
import {SetCurrentUser} from 'modules/application/stores/application.state';
import {ApplicationState} from 'modules/application/stores/application.state';

export enum LoginUseCaseActionTypes {
	SetUserToAuthenticate = '[LOGIN USE CASE] Set User To Authenticate',
	LoginRedirect = '[LOGIN USE CASE] Login Redirect',
	AuthenticateWithPassword = '[LOGIN USE CASE] Authenticate With Password',
	//SetUserProfiles = '[LOGIN USE CASE] Set User Profiles',
	LoginSuccess = '[LOGIN USE CASE] Login Success',
	LoginFail = '[LOGIN USE CASE] Login Fail',
}

export class SetUserToAuthenticate implements Action {
	public readonly type: string = LoginUseCaseActionTypes.SetUserToAuthenticate;

	constructor(public payload: { userToAuthenticate: ApplicationUser }) {}
}

export class LoginRedirect implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginRedirect;
	public payload?: any;
}

export class AuthenticateWithPassword implements Action {
	public readonly type: string = LoginUseCaseActionTypes.AuthenticateWithPassword;

	constructor(public payload: { password: string }) {}
}

/*
export class SetUserProfiles implements Action {
	public readonly type: string = LoginUseCaseActionTypes.SetUserProfiles;

	constructor(public payload: { userProfiles: MetaGameProfile[] }) {}
}
*/
export class LoginSuccess implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginSuccess;
	public payload?: any;
}

export class LoginFail implements Action {
	public readonly type: string = LoginUseCaseActionTypes.LoginFail;

	constructor(public payload: { error: string }) {}
}

export type LoginUseCaseActions =
	| SetUserToAuthenticate
	| LoginRedirect
	| AuthenticateWithPassword
	//| SetUserProfiles
	| LoginSuccess
	| LoginFail;

export interface LoginUseCaseState {
	userToAuthenticate: ApplicationUser | undefined;
	isUserAuthenticated: boolean;
	userProfiles: MetaGameProfile[];
	error: string | undefined;
}

const initialState: LoginUseCaseState = {
	userToAuthenticate: undefined,
	isUserAuthenticated: false,
	userProfiles: [],
	error: undefined
};

export function loginUseCaseReducer(state = initialState, action: LoginUseCaseActions): LoginUseCaseState {
	switch (action.type) {
		case LoginUseCaseActionTypes.SetUserToAuthenticate:
			return { ...state, userToAuthenticate: (action as SetUserToAuthenticate).payload.userToAuthenticate };

//		case LoginUseCaseActionTypes.SetUserProfiles:
//			return { ...state, userProfiles: (action as SetUserProfiles).payload.userProfiles };

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
export const getUserToAuthenticate = createSelector(getUseCaseState, state => state.userToAuthenticate);

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
		ofType(StartupUseCaseActionTypes.LoginUser),
		mergeMap(() => this.useCaseStore.pipe(
			select(getUserToAuthenticate),
			map((user: ApplicationUser | undefined) => user!.isAuthenticationRequired ? new LoginRedirect() : new LoginSuccess())
		)));

	@Effect({ dispatch: false })
	public loginRedirect$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginRedirect),
		tap(() => this.router.navigate(['/authentication/login']))
	);

	@Effect()
	public authenticateWithPassword$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.AuthenticateWithPassword),
		map((action: AuthenticateWithPassword) => action.payload.password),
		switchMap(password => this.authenticationService.login(password).pipe(
			switchMap((isAuthenticated: boolean) => this.useCaseStore.pipe(
				select(getUserToAuthenticate),
				switchMap(((authenticatedUser: ApplicationUser) =>
					isAuthenticated
					? [new SetCurrentUser({ user: authenticatedUser }), new LoginSuccess()]
					: new LoginFail({ error: 'TODO: some error' })) as any)
			))
		)));

/*
	@Effect()
	public authenticateWithPassword$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.AuthenticateWithPassword),
		map((action: AuthenticateWithPassword) => action.payload.password),
		mergeMap(password => this.authenticationService.login(password).pipe(
			mergeMap((isAuthenticated: boolean) => this.selectAuthenticateWithPasswordAction(isAuthenticated))
		)));

*/
	private selectAuthenticateWithPasswordAction(isAuthenticated: boolean): any {
		console.warn(`isAuthenticated: ${isAuthenticated}`);
		if (!isAuthenticated) {
			return new LoginFail({ error: 'TODO: some error' });
		}

		return this.useCaseStore.select(getUserToAuthenticate).map(
			(authenticatedUser: ApplicationUser) => new SetCurrentUser({ user: authenticatedUser }));
	}
/*
	private selectAuthenticateWithPasswordAction(isAuthenticated: boolean): any {
		console.warn(`isAuthenticated: ${isAuthenticated}`);
		if (!isAuthenticated) {
			return new LoginFail({ error: 'TODO: some error' });
		}

		return this.useCaseStore.select(getUserToAuthenticate).map(
			(authenticatedUser: ApplicationUser) => [new SetCurrentUser({ user: authenticatedUser }), new LoginSuccess()]);
	}
*/

//	private selectAuthenticateWithPasswordAction(isAuthenticated: boolean, authenticatedUser: ApplicationUser): any {
//		console.warn(`user: ${authenticatedUser}, isAuthenticated: ${isAuthenticated}`);
//		return isAuthenticated
//					? [new SetCurrentUser({ user: authenticatedUser }), new LoginSuccess()]
//					: new LoginFail({ error: 'TODO: some error' });
//	}
}
