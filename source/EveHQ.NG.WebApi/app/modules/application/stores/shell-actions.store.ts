import { Action } from '@ngrx/store';

export enum ShellActionTypes {
	ShowShellMenu = '[SHELL] Show Shell Menu',
	HideShellMenu = '[SHELL] Hide Shell Menu',
	SetShellHeader = '[SHELL] Set Shell Header'
}

export class ShowShellMenu implements Action {
	public readonly type: string = ShellActionTypes.ShowShellMenu;

	constructor(public readonly payload: string) {
	}
}

export class HideShellMenu implements Action {
	public readonly type: string = ShellActionTypes.HideShellMenu;

	constructor(public readonly payload: string) {
	}
}

export class SetShellHeader implements Action {
	public readonly type: string = ShellActionTypes.SetShellHeader;

	constructor(public readonly payload: string) {
	}
}

export type ShellActions = | ShowShellMenu | HideShellMenu | SetShellHeader;
