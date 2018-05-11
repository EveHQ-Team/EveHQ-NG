import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'modules/backend/application/user.service';
import { ApplicationStore } from 'modules/application/stores/application.state';

export enum ShellActionTypes {
	OpenCharacterDashboard = '[SHELL] Open Character Dashboard',
	ApplicationError = '[SHELL] Application Error',
	ShowShellMenu = '[SHELL] Show Shell Menu',
	HideShellMenu = '[SHELL] Hide Shell Menu',
	SetShellHeader = '[SHELL] Set Shell Header'
}

export class OpenCharacterDashboard implements Action {
	public readonly type: string = ShellActionTypes.OpenCharacterDashboard;
	public readonly payload?: any;
}

export class ApplicationError implements Action {
	constructor(public readonly payload: any) {}

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

	constructor(public readonly payload: string) {}

	public readonly type: string = ShellActionTypes.SetShellHeader;
}

/*
export type ShellActions =
	| OpenCharacterDashboard
	| ApplicationError
	| ShowShellMenu
	| HideShellMenu
	| SetShellHeader;
*/

export type ShellMenuActions =
	| ShowShellMenu
	| HideShellMenu;

export type ShellContentActions =
	| SetShellHeader;

export interface ShellMenuState {
	isMenuShown: boolean
}

const initialShellMenuState: ShellMenuState = {
	isMenuShown: false
};

export function shellMenuReducer(state = initialShellMenuState, action: ShellMenuActions): ShellMenuState {
	switch (action.type) {
		case ShellActionTypes.ShowShellMenu:
			return { ...state, isMenuShown: true };
		case ShellActionTypes.HideShellMenu:
			return { ...state, isMenuShown: false };
		default:
			return state;
	}
}

export interface ShellContentState {
	header: string;
}

const initialShellContentState: ShellContentState = {
	header: ''
};

export function shellContentReducer(state = initialShellContentState, action: ShellContentActions): ShellContentState {
	switch (action.type) {
		case ShellActionTypes.SetShellHeader:
			return { ...state, header: (action as SetShellHeader).payload };
		default:
			return state;
	}
}

export interface ShellState {
	menu: ShellMenuState;
	content: ShellContentState;
}

export interface ShellStore extends ApplicationStore {
	shell: ShellState;
}

export const shellReducers = {
	menu: shellMenuReducer,
	content: shellContentReducer
};

const getShellState = createFeatureSelector<ShellState>('shell');
const getShellMenuState = createSelector(getShellState, state => state.menu);
const getShellContentState = createSelector(getShellState, state => state.content);

export const getIsMenuShown = createSelector(getShellMenuState, state => state.isMenuShown);
export const getHeader = createSelector(getShellContentState, state => state.header);

/*

export interface ShellState1 {
	isMenuShown: boolean;
	header: string;
}

const initialState: ShellState1 = {
	isMenuShown: false,
	header: 'EveHQ NG'
};

export function shellReducer(state: ShellState1 = initialState, action: ShellActions): ShellState1 {
	switch (action.type) {
		case ShellActionTypes.ShowShellMenu:
		{
			return {
				...state,
				isMenuShown: true
			};
		}

		case ShellActionTypes.HideShellMenu:
		{
			return {
				...state,
				isMenuShown: false
			};
		}

		case ShellActionTypes.SetShellHeader:
		{
			return {
				...state,
				header: action.payload
			};
		}

		default:
		{
			return state;
		}
	}
}
*/
/*
@Injectable()
export class ShellEffects {
constructor(
	private readonly actions$: Actions,
	private readonly userService: UserService,
	private readonly router: Router) {}
	@Effect()
	public initializeShell$ = this.actions$.pipe(
		ofType(ShellActionTypes.InitializeApplication),
		mergeMap(() =>
			// TODO: Remember to return user object with an empty password field.
			this.userService.getUser().pipe(
				map((user: User | undefined) =>
					user === undefined
					? new CreateUser()
					: new LoginUser(user)),
				// TODO: Define application error logic.
				catchError(error => of(new ApplicationError(error)))
			)
		)
	);

	@Effect({ dispatch: false })
	public createUser$ = this.actions$.pipe(
		ofType(ShellActionTypes.CreateUser),
		tap(() => this.router.navigate(['/users/create']))
	);

	@Effect()
	public loginUserSuccess$ = this.actions$.pipe(
		ofType(ShellActionTypes.InitializeApplication),
		//ofType(LoginActionTypes.LoginUserSuccess),
		mergeMap(() =>
			this.userService.getUserProfiles().pipe(
				map((profiles: MetaGameProfile[]) => new SelectProfile(profiles)),
				catchError(error => of(new ApplicationError(error)))
			)
		)
	);

	@Effect()
	public selectProfile$ = this.actions$.pipe(
		ofType(ShellActionTypes.SelectProfile),
		map((action: SelectProfile) => action.payload),
		map((profiles: MetaGameProfile[]) =>
			profiles.length > 1
			? new SelectProfileRedirect(profiles)
			: new SelectProfileSuccess(profiles[0]))
	);

	@Effect()
	public selectProfileSuccess$ = this.actions$.pipe(
		ofType(ShellActionTypes.SelectProfileSuccess),
		map(() => new OpenCharacterDashboard())
	);

	@Effect()
	public selectProfileRedirect$ = this.actions$.pipe(
		ofType(ShellActionTypes.SelectProfileRedirect),
		map((action: SelectProfile) => action.payload),
		tap((profiles: MetaGameProfile[]) => {
			return this.router.navigate(['/authentication/select-profile'], { queryParams: { profiles: JSON.stringify(profiles) } });
		})
	);

@Effect({ dispatch: false })
public openCharacterDashboard$ = this.actions$.pipe(
	ofType(ShellActionTypes.OpenCharacterDashboard),
	tap(() => this.router.navigate(['/characters']))
);
}

export class ShellSelector {
public static readonly getIsMenuShown = (state: ShellState1) => state.isMenuShown;
public static readonly getHeader = (state: ShellState1) => state.header;
}
*/
