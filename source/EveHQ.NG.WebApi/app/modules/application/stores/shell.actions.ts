import { Action } from '@ngrx/store';
import { User } from 'modules/application/models/user';
import { AuthenticatedUser } from 'modules/application/models/authenticated-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';

export enum ShellActionTypes {
	InitializeApplication = '[SHELL] Initialize Application',
	CreateUser = '[SHELL] Create User',
	OpenCharacterDashboard = '[SHELL] Open Character Dashboard',
	LoginUser = '[SHELL] Login User',
	LoginUserSuccess = '[SHELL] Login User Success',
	LoginUserFail = '[SHELL] Login User Fail',
	LoginPageRedirect = '[SHELL] Login Page Redirect',
	SelectProfile = '[SHELL] Select Profile',
	SelectProfileSuccess = '[SHELL] Select Profile Success',
	SelectProfileRedirect = '[SHELL] Select Profile Redirect',
	ApplicationError = '[SHELL] Application Error',
	ShowShellMenu = '[SHELL] Show Shell Menu',
	HideShellMenu = '[SHELL] Hide Shell Menu',
	SetShellHeader = '[SHELL] Set Shell Header'
}

export class InitializeApplication implements Action {
	public readonly type: string = ShellActionTypes.InitializeApplication;
	public readonly payload?: any;
}

export class CreateUser implements Action {
	public readonly type: string = ShellActionTypes.CreateUser;
	public readonly payload?: any;
}

export class OpenCharacterDashboard implements Action {
	public readonly type: string = ShellActionTypes.OpenCharacterDashboard;
	public readonly payload?: any;
}

export class LoginUser implements Action {
	constructor(public readonly payload: User) {
	}

	public readonly type: string = ShellActionTypes.LoginUser;
}

export class LoginUserSuccess implements Action {
	constructor(public readonly payload: AuthenticatedUser) {
	}

	public readonly type: string = ShellActionTypes.LoginUserSuccess;
}

export class LoginPageRedirect implements Action {
	constructor(public readonly payload: AuthenticatedUser) {
	}

	public readonly type: string = ShellActionTypes.LoginPageRedirect;
}

export class LoginUserFail implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = ShellActionTypes.LoginUserFail;
}

export class SelectProfile implements Action {
	constructor(public readonly payload: MetaGameProfile[]) {
	}

	public readonly type: string = ShellActionTypes.SelectProfile;
}

export class SelectProfileSuccess implements Action {
	constructor(public readonly payload: MetaGameProfile) {
	}

	public readonly type: string = ShellActionTypes.SelectProfileSuccess;
}

export class SelectProfileRedirect implements Action {
	constructor(public readonly payload: MetaGameProfile[]) {
	}

	public readonly type: string = ShellActionTypes.SelectProfileRedirect;
}

export class ApplicationError implements Action {
	constructor(public readonly payload: any) {
	}

	public readonly type: string = ShellActionTypes.ApplicationError;
}

export class ShowShellMenu implements Action {
	public readonly type: string = ShellActionTypes.ShowShellMenu;
	public readonly payload?: any;
}

export class HideShellMenu implements Action {
	public readonly type: string = ShellActionTypes.HideShellMenu;
	public readonly payload?: any;
}

export class SetShellHeader implements Action {

	constructor(public readonly payload: string) {
	}

	public readonly type: string = ShellActionTypes.SetShellHeader;
}

export type ShellActions =
	| InitializeApplication
	| CreateUser
	| OpenCharacterDashboard
	| LoginUser
	| LoginPageRedirect
	| LoginUserSuccess
	| LoginUserFail
	| SelectProfile
	| SelectProfileSuccess
	| SelectProfileRedirect
	| ApplicationError
	| ShowShellMenu
	| HideShellMenu
	| SetShellHeader;
