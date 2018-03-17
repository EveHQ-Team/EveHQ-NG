import { Action } from '@ngrx/store';
import { User } from 'modules/users/models/user';
import { Authenticate } from 'modules/users/models/authenticate';

export enum UsersActionTypes {
	SetUser = '[USERS] Set User',
	Login = '[USERS] Login',
	Logout = '[USERS] Logout',
	LoginSuccess = '[USERS] Login Success',
	LoginFailure = '[Auth] Login Failure',
	CreateUserRedirect = '[USERS] Create User Redirect',
	LoginRedirect = '[USERS] Login Redirect',
	HomeRedirect = '[USERS] Home Redirect'
}

export class SetUser implements Action {

	constructor(public readonly payload: User | undefined) {
	}

	public readonly type: string = UsersActionTypes.SetUser;
}

export class Login implements Action {

	constructor(public readonly payload: Authenticate) {
	}

	public readonly type: string = UsersActionTypes.Login;
}

export class Logout implements Action {
	public readonly type: string = UsersActionTypes.Logout;
	public readonly payload?: any;
}

export class LoginSuccess implements Action {
	constructor(public readonly payload: { user: User }) {
	}

	public readonly type: string = UsersActionTypes.LoginSuccess;
}

export class LoginFailure implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = UsersActionTypes.LoginFailure;
}

export class CreateUserRedirect implements Action {
	public readonly type: string = UsersActionTypes.CreateUserRedirect;
	public readonly payload?: any;
}

export class LoginRedirect implements Action {
	public readonly type: string = UsersActionTypes.LoginRedirect;
	public readonly payload?: any;
}

export class HomeRedirect implements Action {
	public readonly type: string = UsersActionTypes.HomeRedirect;
	public readonly payload?: any;
}

export type UsersActions =
	| SetUser
	| Login
	| Logout
	| LoginSuccess
	| LoginFailure
	| CreateUserRedirect
	| LoginRedirect
	| HomeRedirect;
