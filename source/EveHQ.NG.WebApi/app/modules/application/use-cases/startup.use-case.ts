import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'modules/backend/application/user.service';
import {
	CreateUserUseCaseActionTypes,
	CreateUser,
	CreateUserSuccess
	} from 'modules/application/use-cases/create-user.use-case';
import {
	SelectProfileUseCaseActionTypes,
	SelectProfileSuccess,
	SelectProfile
	} from 'modules/application/use-cases/select-profile.use-case';
import { LoginUser, LoginUseCaseActionTypes } from 'modules/application/use-cases/login.use-case';
import {
	ApplicationStore,
	SetCurrentUserProfiles,
	SetIsUserAuthenticated,
	SetCurrentCharacter,
	SetCurrentUser,
	SetCurrentProfile
	} from 'modules/application/stores/application.state';
import { tag } from 'rxjs-spy/operators/tag';
import { InstallationService } from 'modules/backend/application/installation.service';
import { InstallApplication } from 'modules/application/use-cases/install-application.use-case';

export enum StartupUseCaseActionTypes {
	StartApplication = '[STARTUP USE CASE] Start Application',
	InitializeApplication = '[STARTUP USE CASE] Initialize Application',
	CharacterDashboardRedirect = '[STARTUP USE CASE] Character Dashboard Redirect',
}

export class StartApplication implements Action {
	public readonly type: string = StartupUseCaseActionTypes.StartApplication;
}

export class InitializeApplication implements Action {
	public readonly type: string = StartupUseCaseActionTypes.InitializeApplication;
}

export class CharacterDashboardRedirect implements Action {
	public readonly type = StartupUseCaseActionTypes.CharacterDashboardRedirect;
}

export type StartupUseCaseActions =
	| StartApplication
	| InitializeApplication
	| CharacterDashboardRedirect;

@Injectable()
export class StartupUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<ApplicationStore>,
		private readonly installationService: InstallationService,
		private readonly userService: UserService,
		private readonly router: Router) {}

	@Effect()
	public startApplication$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.StartApplication),
		mergeMap(() => this.installationService.isApplicationInstalled().pipe(
			mergeMap(isApplicationInstalled => isApplicationInstalled
												? of(new InitializeApplication())
												: of(new InstallApplication())))));

	@Effect()
	public initializeApplication$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.InitializeApplication),
		mergeMap(() => this.userService.getUser().pipe(
			mergeMap(user => user === undefined
							? of(new CreateUser())
							: of(new LoginUser({ userToAuthenticate: user }))))));

	@Effect()
	public createUserSuccess$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUserSuccess),
		map((action: CreateUserSuccess) => action.payload.userData),
		mergeMap(createUserModel => forkJoin(
			this.userService.setUser(createUserModel.user, createUserModel.password),
			this.userService.setUserProfiles(createUserModel.profiles))),
		mergeMap(([user, profiles]) => of(new LoginUser({ userToAuthenticate: user }))));

	@Effect()
	public loginUserSuccess$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginSuccess),
		mergeMap(() => forkJoin(
			this.userService.getUser(),
			this.userService.getUserProfiles())),
		mergeMap(([user, profiles]) => from([
			new SetCurrentUser({ user: user! }),
			new SetCurrentUserProfiles({ profiles: profiles! }),
			new SetIsUserAuthenticated({ isUserAuthenticated: true }),
			new SelectProfile({ profilesToSelectFrom: profiles! })
		])));

	@Effect()
	public selectProfileSuccess$ = this.actions$.pipe(
		ofType(SelectProfileUseCaseActionTypes.SelectProfileSuccess),
		map((action: SelectProfileSuccess) => action.payload.selectedProfileId),
		mergeMap((selectedProfileId: string) => from([
			new SetCurrentProfile({ profileId: selectedProfileId }),
			new SetCurrentCharacter({ characterId: 'TODO: Change it!!!' }),
			new CharacterDashboardRedirect()
		])));

	@Effect({ dispatch: false })
	public characterDashboardRedirect$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.CharacterDashboardRedirect),
		tap(() => this.router.navigate(['/characters/dashboard'])));
}
