import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RequiredDatabase } from 'modules/application/models/required-database.model';
import { ApplicationStore } from 'modules/application/stores/application.state';
import { from } from 'rxjs/observable/from';
import { DatabasesService } from 'modules/common/services/databases.service';
import { of } from 'rxjs/observable/of';
import { ApiException } from 'modules/application/models/api-exception';

export enum CreateRequiredDatabasesUseCaseActionTypes {
	CreateRequiredDatabasesStart = '[CREATE REQUIRED DATABASES] Create Required Databases Start',
	OpenCreateRequiredDatabasesScreen = '[CREATE REQUIRED DATABASES] Open Create Required Databases Screen',
	CreateDatabase = '[CREATE REQUIRED DATABASES] Create Database',
	CreateDatabaseSuccess = '[CREATE REQUIRED DATABASES] Create Database Success',
	CreateDatabaseFail = '[CREATE REQUIRED DATABASES] Create Database Fail',
	CreateRequiredDatabasesSuccess = '[CREATE REQUIRED DATABASES] Create Required Databases Success',
	CreateRequiredDatabasesFail = '[CREATE REQUIRED DATABASES] Create Required Databases Fail'
}

export class CreateRequiredDatabasesStart implements Action {
	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesStart;
}

export class OpenCreateRequiredDatabasesScreen implements Action {
	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.OpenCreateRequiredDatabasesScreen;
}

export class CreateDatabase implements Action {
	constructor(public readonly databaseName: string) {}

	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateDatabase;
}

export class CreateDatabaseSuccess implements Action {
	constructor(public readonly databaseName: string) {}

	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateDatabaseSuccess;
}

export class CreateDatabaseFail implements Action {
	constructor(public readonly errors: string[]) {}

	public readonly type = CreateRequiredDatabasesUseCaseActionTypes.CreateDatabaseFail;
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
		private readonly router: Router,
		private readonly databasesService: DatabasesService) {}

	@Effect()
	public createRequiredDatabasesStart$ = this.actions$.pipe(
		ofType(CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesStart),
		mergeMap(() => from([
			new CreateDatabase(applicationDatabaseId),
			new CreateDatabase(sdeDatabaseId),
			new OpenCreateRequiredDatabasesScreen()
		])));

	@Effect({ dispatch: false })
	public openCreateRequiredDatabasesScreen$ = this.actions$.pipe(
		ofType(CreateRequiredDatabasesUseCaseActionTypes.OpenCreateRequiredDatabasesScreen),
		tap(() => this.router.navigate(['installation/required-databases'])));

	@Effect()
	public createDatabase$ = this.actions$.pipe(
		ofType(CreateRequiredDatabasesUseCaseActionTypes.CreateDatabase),
		map((action: CreateDatabase) => action.databaseName),
		mergeMap(databaseName => this.databasesService.createDatabase(databaseName).pipe(
			map(() => new CreateDatabaseSuccess(databaseName)),
			catchError((error: ApiException) => of(new CreateDatabaseFail(error.errors.map(item => item.message)))))));
}

export interface CreateRequiredDatabasesUseCaseState {
	requiredDatabases: RequiredDatabase[];
	errors: string[];
}

const applicationDatabaseId = 'evehq-ng';
const sdeDatabaseId = 'sde';

const initialState: CreateRequiredDatabasesUseCaseState = {
	requiredDatabases: [
		{ name: applicationDatabaseId, displayName: 'Application database', isCreated: false },
		{ name: sdeDatabaseId, displayName: 'Static Database Export (SDE)', isCreated: false }
	],
	errors: []
};

function createRequiredDatabasesUseCaseReducer(state = initialState, action: Action): CreateRequiredDatabasesUseCaseState {
	switch (action.type) {
		case CreateRequiredDatabasesUseCaseActionTypes.CreateDatabaseSuccess:
			const databaseName = (action as CreateDatabaseSuccess).databaseName;
			const indexOfDatabase = state.requiredDatabases.findIndex(item => item.name === databaseName);
			const database = state.requiredDatabases.splice(indexOfDatabase, 1);
			database[0].isCreated = true;

			return {
				...state,
				requiredDatabases: [...state.requiredDatabases, database[0]]
			};
		case CreateRequiredDatabasesUseCaseActionTypes.CreateDatabaseFail:
			const errors = (action as CreateDatabaseFail).errors;

			return {
				...state,
				errors: [...state.errors, ...errors]
			};
		default:
			return state;
	}
}

export interface CreateRequiredDatabasesUseCaseStore extends ApplicationStore {
	useCase: CreateRequiredDatabasesUseCaseState;
}

export const createRequiredDatabasesUseCaseReducers = {
	useCase: createRequiredDatabasesUseCaseReducer
};

const getCreateRequiredDatabasesUseCaseStore =
	createFeatureSelector<CreateRequiredDatabasesUseCaseStore>('createRequiredDatabasesUseCase');
const getUseCaseState = createSelector(getCreateRequiredDatabasesUseCaseStore, store => store.useCase);
export const getRequiredDatabases = createSelector(getUseCaseState, state => state.requiredDatabases);
export const getErrors = createSelector(getUseCaseState, state => state.errors);
