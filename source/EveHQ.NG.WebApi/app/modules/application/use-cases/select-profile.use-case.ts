import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action, select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { StartupUseCaseActionTypes } from 'modules/application/use-cases/startup.use-case';
import { ApplicationState, getCurrentUserProfiles } from 'modules/application/stores/application.state';

export enum SelectProfileUseCaseActionTypes {
	SelectProfileRedirect = '[SELECT PROFILE USE CASE] Select Profile Redirect',
	SelectProfileSuccess = '[SELECT PROFILE USE CASE] Select Profile Success',
}

export class SelectProfileRedirect implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SelectProfileRedirect;
	public payload?: any;
}

export class SelectProfileSuccess implements Action {
	public readonly type: string = SelectProfileUseCaseActionTypes.SelectProfileSuccess;

	constructor(public payload: { selectedProfileId: string }) {}
}

export type SelectProfileUseCaseActions =
	| SelectProfileRedirect
	| SelectProfileSuccess;

@Injectable()
export class SelectProfileUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<ApplicationState>,
		private readonly router: Router) {}

/*
	@Effect()
	public authenticateWithPassword$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.AuthenticateWithPassword),
		map((action: AuthenticateWithPassword) => action.payload.password),
		switchMap(password => this.authenticationService.login(password).pipe(
			switchMap((isAuthenticated: boolean) => this.useCaseStore.pipe(
				select(getUserToAuthenticate),
				switchMap(((authenticatedUser: ApplicationUser) =>
					isAuthenticated
					? [new SetCurrentUser({ user: authenticatedUser }), new LoginSuccess()]
					: new LoginFail({ error: 'TODO: some error' })) as any)
			))
		)));
*/
	@Effect()
	public selectProfile$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.SelectProfile),
		switchMap(() => this.store.pipe(
			select(getCurrentUserProfiles),
			switchMap(((profiles: MetaGameProfile[]) => profiles.length > 1
												? of(new SelectProfileRedirect())
												: of(new SelectProfileSuccess({ selectedProfileId: profiles[0].id }))) as any)
		)));
/*
	@Effect()
	public selectProfile$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.SelectProfile),
		mergeMap(() => this.store.pipe(
			select(getCurrentUserProfiles),
			map(((profiles: MetaGameProfile[]) => profiles.length > 1
												? new SelectProfileRedirect()
												: new SelectProfileSuccess({ selectedProfileId: profiles[0].id })) as any)
		)));
*/

	@Effect({ dispatch: false })
	public selectProfileRedirect$ = this.actions$.pipe(
		ofType(SelectProfileUseCaseActionTypes.SelectProfileRedirect),
		tap(() => this.router.navigate(['/authentication/select-profile']))
	);

	private getSelectProfileNextAction(profiles: MetaGameProfile[]): any {
		return;
	}
}
