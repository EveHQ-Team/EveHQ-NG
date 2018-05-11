import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Action, Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationUser } from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';
import { UserService } from 'modules/backend/application/user.service';
import { ApplicationError } from 'modules/application/stores/shell.state';
import {
	CreateUserUseCaseActionTypes,
	CreateUser,
	CreateUserRedirect,
	CreateUserSuccess,
	CreateUserFail
	} from
	'modules/application/use-cases/create-user.use-case';
import { CreateUserModel } from 'modules/application/models/create-user-model';
//import { MainState, getIsUserAuthenticated, getUserToAuthenticate } from 'modules/application/stores/main.state';
import { ApplicationStore } from 'modules/application/stores/application.state';
import { SelectProfileUseCaseActionTypes, SelectProfileSuccess } from 'modules/application/use-cases/select-profile.use-case';
import { LoginUseCaseActionTypes, SetUserToAuthenticate } from 'modules/application/use-cases/login.use-case';
import { ManageProfileCharactersRedirect } from 'modules/users/use-cases/manage-profile-characters.use-case';
import {SetCurrentUserProfiles} from 'modules/application/stores/application.state';
import {ApplicationStateActionTypes} from 'modules/application/stores/application.state';

export enum StartupUseCaseActionTypes {
	InitializeApplication = '[STARTUP USE CASE] Initialize Application',
	LoginUser = '[STARTUP USE CASE] Login User',
	SelectProfile = '[STARTUP USE CASE] Select Profile',
	OpenCharacterDashboard = '[STARTUP USE CASE] Open Character Dashboard',
}

export class InitializeApplication implements Action {
	public readonly type: string = StartupUseCaseActionTypes.InitializeApplication;
	public readonly payload?: any;
}

export class LoginUser implements Action {
	public readonly type: string = StartupUseCaseActionTypes.LoginUser;
	public readonly payload?: any;
}

export class SelectProfile implements Action {
	public readonly type: string = StartupUseCaseActionTypes.SelectProfile;
	public payload?: any;
}

export class OpenCharacterDashboard implements Action {
	public readonly type: string = StartupUseCaseActionTypes.OpenCharacterDashboard;
	public payload?: any;
}

export type StartupUseCaseActions =
	| InitializeApplication
	| LoginUser
	| SelectProfile
	| OpenCharacterDashboard;

@Injectable()
export class StartupUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<ApplicationStore>,
		private readonly userService: UserService,
		private readonly router: Router) {}

	@Effect()
	public initializeShell$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.InitializeApplication),
		mergeMap(() =>
			this.userService.getUser().pipe(
				map((user: ApplicationUser | undefined) =>
					user === undefined
					? new CreateUserRedirect()
					: [new SetUserToAuthenticate({ userToAuthenticate: user }), new LoginUser()]),
				// TODO: Define application error logic.
				catchError(error => of(new ApplicationError({ error: error })))
			)
		)
	);

	@Effect()
	public createUser$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUser),
		map((action: CreateUser) => action.payload.userData),
		mergeMap((model: CreateUserModel) =>
			forkJoin(
				this.userService.setUser(model.user, model.password),
				this.userService.setUserProfiles(model.profiles))
			.mergeMap(() => [new SetUserToAuthenticate({ userToAuthenticate: model.user }), new CreateUserSuccess()])));

	@Effect()
	public createUserSuccess$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUserSuccess),
		map(() => new LoginUser()));

	@Effect()
	public loginUserSuccess$ = this.actions$.pipe(
		ofType(ApplicationStateActionTypes.SetCurrentUser),
		mergeMap(() => this.userService.getUserProfiles().pipe(
			mergeMap((profiles: MetaGameProfile[] | undefined) =>
				[new SetCurrentUserProfiles({ profiles: profiles! }), new SelectProfile()])
		)));

/*
	@Effect()
	public loginUserSuccess$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginSuccess),
		mergeMap(() => this.userService.getUserProfiles().pipe(
			mergeMap((profiles: MetaGameProfile[] | undefined) =>
				[new SetCurrentUserProfiles({ profiles: profiles! }), new SelectProfile()])
		)));

*/
	@Effect()
	public selectProfileSuccess$ = this.actions$.pipe(
		ofType(SelectProfileUseCaseActionTypes.SelectProfileSuccess),
		map((action: SelectProfileSuccess) => action.payload.selectedProfileId),
			mergeMap((selectedProfileId: string) => this.store.pipe(
				tap(() => of(new OpenCharacterDashboard()))
		))
	);

//	@Effect()
//	public loginUserSuccess$ = this.actions$.pipe(
//		ofType(LoginUseCaseActionTypes.LoginSuccess),
//		map(() => new SelectProfileRedirect()));

/*
	@Effect()
	public selectProfileSuccess$ = this.actions$.pipe(
		ofType(SelectProfileUseCaseActionTypes.SelectProfileSucces),
		mergeMap(() => this.store.pipe(select(getCurrentProfileCharacters)),
			mergeMap(characters => characters.length > 0
									? [new SetCurrentCharacter(selectCurrentCharacter(characters)), new OpenCurrentCharacterDashboard()
									: new ManageProfileCharactersRedirect())));

	private selectCurrentCharacter(characters: Character[])
*/
}
