import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationUser } from 'modules/application/models/application-user';
import { UserService } from 'modules/backend/application/user.service';
import { ApplicationError } from 'modules/application/stores/shell.actions';

export enum StartupUseCaseActionTypes {
	InitializeApplication = '[STARTUP USE CASE] Initialize Application',
	CreateUserRedirect = '[STARTUP USE CASE] Create User Redirect',
	LoginUser = '[STARTUP USE CASE] Login User',
}

export class InitializeApplication implements Action {
	public readonly type: string = StartupUseCaseActionTypes.InitializeApplication;
	public readonly payload?: any;
}

export class CreateUserRedirect implements Action {
	public readonly type: string = StartupUseCaseActionTypes.CreateUserRedirect;
	public readonly payload?: any;
}

export class LoginUser implements Action {
	public readonly type: string = StartupUseCaseActionTypes.LoginUser;

	constructor(public payload: ApplicationUser) {
	}
}

export type StartupUseCaseActions =
	| InitializeApplication
	| CreateUserRedirect
	| LoginUser;

@Injectable()
export class StartupUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly userService: UserService,
		private readonly router: Router) {
	}

	@Effect()
	public initializeShell$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.InitializeApplication),
		mergeMap(() =>
			// TODO: Remember to return user object with an empty password field.
			this.userService.getUser().pipe(
				map((user: ApplicationUser | undefined) => user === undefined ? new CreateUserRedirect() : new LoginUser(user)),
				// TODO: Define application error logic.
				catchError(error => of(new ApplicationError(error)))
			)
		)
	);

	@Effect({ dispatch: false })
	public createUser$ = this.actions$.pipe(
		ofType(StartupUseCaseActionTypes.CreateUserRedirect),
		tap(() => this.router.navigate(['/users/create']))
	);
}
