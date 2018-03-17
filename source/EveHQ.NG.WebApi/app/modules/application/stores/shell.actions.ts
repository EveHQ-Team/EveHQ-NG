import { Action } from '@ngrx/store';

export enum ShellActionTypes {
	ShowShellMenu = '[SHELL] Show Shell Menu',
	HideShellMenu = '[SHELL] Hide Shell Menu',
	SetShellHeader = '[SHELL] Set Shell Header'
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
	| ShowShellMenu
	| HideShellMenu
	| SetShellHeader;
