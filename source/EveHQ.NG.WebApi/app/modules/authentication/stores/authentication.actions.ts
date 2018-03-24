import { Action } from '@ngrx/store';
import { AuthenticatedUser } from 'modules/authentication/models/authenticated-user';
import { Authenticate } from 'modules/authentication/models/authenticate';

export enum AuthenticationActionTypes {
	SetUser = '[AUTHENTICATION] Set User',
	Login = '[AUTHENTICATION] Login',
	Logout = '[AUTHENTICATION] Logout',
	LoginSuccess = '[AUTHENTICATION] Login Success',
	LoginFailure = '[Auth] Login Failure',
	CreateUserRedirect = '[AUTHENTICATION] Create User Redirect',
	LoginRedirect = '[AUTHENTICATION] Login Redirect',
	HomeRedirect = '[AUTHENTICATION] Home Redirect'
}

export class SetUser implements Action {

	constructor(public readonly payload: AuthenticatedUser | undefined) {
	}

	public readonly type: string = AuthenticationActionTypes.SetUser;
}

export class Login implements Action {

	constructor(public readonly payload: Authenticate) {
	}

	public readonly type: string = AuthenticationActionTypes.Login;
}

export class Logout implements Action {
	public readonly type: string = AuthenticationActionTypes.Logout;
	public readonly payload?: any;
}

export class LoginSuccess implements Action {
	constructor(public readonly payload: { user: AuthenticatedUser }) {
	}

	public readonly type: string = AuthenticationActionTypes.LoginSuccess;
}

export class LoginFailure implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = AuthenticationActionTypes.LoginFailure;
}

export class CreateUserRedirect implements Action {
	public readonly type: string = AuthenticationActionTypes.CreateUserRedirect;
	public readonly payload?: any;
}

export class LoginRedirect implements Action {
	public readonly type: string = AuthenticationActionTypes.LoginRedirect;
	public readonly payload?: any;
}

export class HomeRedirect implements Action {
	public readonly type: string = AuthenticationActionTypes.HomeRedirect;
	public readonly payload?: any;
}

export type AuthenticationActions =
	| SetUser
	| Login
	| Logout
	| LoginSuccess
	| LoginFailure
	| CreateUserRedirect
	| LoginRedirect
	| HomeRedirect;
