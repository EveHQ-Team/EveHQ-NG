import { Action } from '@ngrx/store';

export enum ManageProfileCharactersUseCaseActionTypes {
	ManageProfileCharactersRedirect = '[MANAGE PROFILE CHARACTERS] Manage Profile Characters Redirect'
}

export class ManageProfileCharactersRedirect implements Action {
	public readonly type: string = ManageProfileCharactersUseCaseActionTypes.ManageProfileCharactersRedirect;
	public payload?: any;
}

export type ManageProfileCharactersUseCaseActions =
	| ManageProfileCharactersRedirect;
