import { Action } from '@ngrx/store';
import { User } from 'modules/users/models/user';

export enum UsersActionTypes {
	Load = '[USERS] Load user',
	LoadSuccess = '[USERS] Load Success',
	LoadFail = '[USERS] Load Fail',
	SetUser = '[USERS] Set User',
	SetUserSuccess = '[USERS] Set User Success',
	SetUserFail = '[USERS] Set User Fail',
}

export class Load implements Action {
	public readonly type: string = UsersActionTypes.Load;
	public readonly payload?: any;
}

export class LoadSuccess implements Action {

	constructor(public readonly payload: User | undefined) {
	}

	public readonly type: string = UsersActionTypes.LoadSuccess;
}

export class LoadFail implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = UsersActionTypes.LoadFail;
}

export class SetUser implements Action {
	constructor(public readonly payload: User) {
	}

	public readonly type: string = UsersActionTypes.SetUser;
}

export class SetUserSuccess implements Action {
	constructor(public readonly payload: User) {
	}

	public readonly type: string = UsersActionTypes.SetUserSuccess;
}

export class SetUserFail implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = UsersActionTypes.SetUserFail;
}

export type UsersActions =
	| Load
	| LoadSuccess
	| LoadFail
	| SetUser
	| SetUserSuccess
	| SetUserFail;
