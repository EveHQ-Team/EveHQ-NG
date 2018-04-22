import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'modules/backend/application/user.service';

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
	| OpenCharacterDashboard
	| ApplicationError
	| ShowShellMenu
	| HideShellMenu
	| SetShellHeader;

export interface ShellState {
	isMenuShown: boolean;
	header: string;
}

const initialState: ShellState = {
	isMenuShown: false,
	header: 'EveHQ NG'
};

export function shellReducer(state: ShellState = initialState, action: ShellActions): ShellState {
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

@Injectable()
export class ShellEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userService: UserService,
		private readonly router: Router) {
	}
	/*
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
	*/

	@Effect({ dispatch: false })
	public openCharacterDashboard$ = this.actions$.pipe(
		ofType(ShellActionTypes.OpenCharacterDashboard),
		tap(() => this.router.navigate(['/characters']))
	);
}

export class ShellSelector {
	public static readonly getIsMenuShown = (state: ShellState) => state.isMenuShown;
	public static readonly getHeader = (state: ShellState) => state.header;
}
