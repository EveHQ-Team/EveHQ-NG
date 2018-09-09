import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

export enum CreateRequiredDatabasesUseCaseActionTypes {
	CreateRequiredDatabasesStart = '[CREATE REQUIRED DATABASES] Create Required Databases Start',
	OpenCreateRequiredDatabasesScreen = '[CREATE REQUIRED DATABASES] Open Create Required Databases Screen',
	CreateRequiredDatabasesSuccess = '[CREATE REQUIRED DATABASES] Create Required Databases Success',
	CreateRequiredDatabasesFail = '[CREATE REQUIRED DATABASES] Create Required Databases Fail'
}

export class CreateRequiredDatabasesStart implements Action {
	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesStart;
}

export class OpenCreateRequiredDatabasesScreen implements Action {
	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.OpenCreateRequiredDatabasesScreen;
}

export class CreateRequiredDatabasesSuccess implements Action {
	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesSuccess;
}

export class CreateRequiredDatabasesFail implements Action {
	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesFail;
}

@Injectable()
export class CreateRequiredDatabasesUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router) {}

	@Effect()
	public createRequiredDatabasesStart$ = this.actions$.pipe(
		ofType(CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesStart),
		map(() => new OpenCreateRequiredDatabasesScreen()));

	@Effect({ dispatch: false })
	public openCreateRequiredDatabasesScreen$ = this.actions$.pipe(
		ofType(CreateRequiredDatabasesUseCaseActionTypes.OpenCreateRequiredDatabasesScreen),
		tap(() => this.router.navigate(['installation/required-databases'])));
}
