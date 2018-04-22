import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Action, Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationUser } from 'modules/application/models/application-user';
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
import { ApplicationState, getIsUserAuthenticated, getUserToAuthenticate } from 'modules/application/application.state';
import { SelectProfileUseCaseActionTypes, SelectProfileRedirect } from 'modules/application/use-cases/select-profile.use-case';
import { LoginUseCaseActionTypes, SetUserToAuthenticate } from 'modules/application/use-cases/login.use-case';

export enum StartupUseCaseActionTypes {
	InitializeApplication = '[STARTUP USE CASE] Initialize Application',
	LoginUser = '[STARTUP USE CASE] Login User',
}

export class InitializeApplication implements Action {
	public readonly type: string = StartupUseCaseActionTypes.InitializeApplication;
	public readonly payload?: any;
}

export class LoginUser implements Action {
	public readonly type: string = StartupUseCaseActionTypes.LoginUser;
	public readonly payload?: any;
}

export type StartupUseCaseActions =
	| InitializeApplication
	| LoginUser;

@Injectable()
export class StartupUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly store: Store<ApplicationState>,
		private readonly userService: UserService,
		private readonly router: Router) {
	}

	@Effect()
	public initializeShell$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.InitializeApplication),
		mergeMap(() =>
			// TODO: Remember to return user object with an empty password field.
			this.userService.getUser().pipe(
				map((user: ApplicationUser | undefined) =>
					user === undefined
					? new CreateUserRedirect()
					: [new SetUserToAuthenticate(user), new LoginUser()]),
				// TODO: Define application error logic.
				catchError(error => of(new ApplicationError({ error: error })))
			)
		)
	);

	@Effect()
	public createUser$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUser),
		map((action: CreateUser) => action.payload),
		mergeMap((model: CreateUserModel) =>
			forkJoin(
				this.userService.setUser(model.user, model.password),
				this.userService.setUserProfiles(model.profiles))
			.mergeMap(() => [new SetUserToAuthenticate(model.user), new CreateUserSuccess()])));

	@Effect()
	public createUserSuccess$ = this.actions$.pipe(
		ofType(CreateUserUseCaseActionTypes.CreateUserSuccess),
		map(() => new LoginUser()));

	@Effect()
	public loginUserSuccess$ = this.actions$.pipe(
		ofType(LoginUseCaseActionTypes.LoginSuccess),
		map(() => new SelectProfileRedirect()));
}
