import { Action } from '@ngrx/store';

export enum ShellActionTypes {
	InitializeApplication = '[SHELL] Initialize Application',
	OpenCharacterDashboard = '[SHELL] Open Character Dashboard',
	ApplicationError = '[SHELL] Application Error',
	ShowShellMenu = '[SHELL] Show Shell Menu',
	HideShellMenu = '[SHELL] Hide Shell Menu',
	SetShellHeader = '[SHELL] Set Shell Header'
}

export class InitializeApplication implements Action {
	public readonly type: string = ShellActionTypes.InitializeApplication;
	public readonly payload?: any;
}

export class OpenCharacterDashboard implements Action {
	public readonly type: string = ShellActionTypes.OpenCharacterDashboard;
	public readonly payload?: any;
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
	| OpenCharacterDashboard
	| ApplicationError
	| ShowShellMenu
	| HideShellMenu
	| SetShellHeader;
