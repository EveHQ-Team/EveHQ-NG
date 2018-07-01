import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationConfiguration } from 'modules/application/models/application-configuration';
import { InstallationService } from 'modules/backend/application/installation.service';
import { CustomUrlSchema } from 'modules/application/models/custom-url-schema';
import { ApplicationStore } from 'modules/application/stores/application.state';

export enum InstallApplicationUseCaseActionTypes {
	InstallApplication = '[INSTALL APPLICATION USE CASE] Install Application',
	GetApplicationConfiguration = '[INSTALL APPLICATION USE CASE] Get Application Configuration',
	GetApplicationConfigurationSuccessful = '[INSTALL APPLICATION USE CASE] Get Application Configuration Successful',
	GatherApplicationConfiguration = '[INSTALL APPLICATION USE CASE] Gather Application Configuration',
	OpenApplicationConfigurationScreen = '[INSTALL APPLICATION USE CASE] Open Application Configuration Screen',
	GetherApplicationConfiguration = '[INSTALL APPLICATION USE CASE] Gether Application Configuration',
	SetApplicationConfiguration = '[INSTALL APPLICATION USE CASE] Set Application Configuration',
	SetApplicationConfigurationError = '[INSTALL APPLICATION USE CASE] Set Application Configuration Error',
	GetherCustomUrlSchemaData = '[INSTALL APPLICATION USE CASE] Gether Custom Url Schema Data',
	OpenCustomUrlSchemaScreen = '[INSTALL APPLICATION USE CASE] Open Custom Url Schema Screen',
	InstallCustomUrlSchema = '[INSTALL APPLICATION USE CASE] Install Custom Url Schema',
	InstallCustomUrlSchemaError = '[INSTALL APPLICATION USE CASE] Install Custom Url Schema Error',
	CreateApplicationDatabase = '[INSTALL APPLICATION USE CASE] Create Application Database',
	CreateApplicationDatabaseError = '[INSTALL APPLICATION USE CASE] Create Application Database Error',
	DownloadSde = '[INSTALL APPLICATION USE CASE] Download Sde',
	DownloadSdeError = '[INSTALL APPLICATION USE CASE] Download Sde Error',
	OpenDownloadSdeScreen = '[INSTALL APPLICATION USE CASE] Open Download Sde Screen',
}

export class InstallApplication implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.InstallApplication;
}

export class GetApplicationConfiguration implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.GetApplicationConfiguration;
}

export class GetApplicationConfigurationSuccessful implements Action {
	constructor(public readonly payload: { applicationConfiguration: ApplicationConfiguration }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.GetApplicationConfigurationSuccessful;
}

export class GatherApplicationConfiguration implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.GatherApplicationConfiguration;
}

export class OpenApplicationConfigurationScreen implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.OpenApplicationConfigurationScreen;
}

export class GatherApplicationConfigurationSuccess implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.GetherApplicationConfiguration;
}

export class SetApplicationConfiguration implements Action {
	constructor(public readonly payload: { applicationConfiguration: ApplicationConfiguration }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.SetApplicationConfiguration;
}

export class SetApplicationConfigurationError implements Action {
	constructor(public readonly payload: { error: any }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.SetApplicationConfigurationError;
}

export class GetherCustomUrlSchemaData implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.GetherCustomUrlSchemaData;
}

export class OpenCustomUrlSchemaScreen implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.OpenCustomUrlSchemaScreen;
}

export class InstallCustomUrlSchema implements Action {
	constructor(public readonly payload: { customUrlSchema: CustomUrlSchema }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.InstallCustomUrlSchema;
}

export class InstallCustomUrlSchemaError implements Action {
	constructor(public readonly payload: { error: any }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.InstallCustomUrlSchemaError;
}

export class CreateApplicationDatabase implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.CreateApplicationDatabase;
}

export class CreateApplicationDatabaseError implements Action {
	constructor(public readonly payload: { error: any }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.CreateApplicationDatabaseError;
}

export class DownloadSde implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.DownloadSde;
}

export class DownloadSdeError implements Action {
	constructor(public readonly payload: { error: any }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.DownloadSdeError;
}

export class OpenDownloadSdeScreen implements Action {
	constructor(public readonly payload: { downloadId: string }) {}

	public readonly type: string = InstallApplicationUseCaseActionTypes.OpenDownloadSdeScreen;
}

export type InstallApplicationUseCaseActions =
	| InstallApplication
	| GetApplicationConfiguration
	| GetApplicationConfigurationSuccessful
	| GatherApplicationConfiguration
	| OpenApplicationConfigurationScreen
	| GatherApplicationConfigurationSuccess
	| SetApplicationConfiguration
	| SetApplicationConfigurationError
	| GetherCustomUrlSchemaData
	| OpenCustomUrlSchemaScreen
	| InstallCustomUrlSchema
	| InstallCustomUrlSchemaError
	| CreateApplicationDatabase
	| CreateApplicationDatabaseError
	| DownloadSde
	| DownloadSdeError
	| OpenDownloadSdeScreen;

export interface InstallApplicationUseCaseState {
	applicationConfiguration: ApplicationConfiguration,
	setApplicationConfigurationError: any;
	installCustomUrlSchemaError: any;
	createApplicationDatabaseError: any;
	downloadSdeError: any;
	downloadSdeDownloadId: string | undefined;
}

const initialState: InstallApplicationUseCaseState = {
	applicationConfiguration: { dataFolderPath: '', backendServicePortNumber: 4000 },
	setApplicationConfigurationError: undefined,
	installCustomUrlSchemaError: undefined,
	createApplicationDatabaseError: undefined,
	downloadSdeError: undefined,
	downloadSdeDownloadId: undefined
};

function installApplicationUseCaseReducer(state = initialState, action: InstallApplicationUseCaseActions): InstallApplicationUseCaseState {
	switch (action.type) {
		case InstallApplicationUseCaseActionTypes.GetApplicationConfigurationSuccessful:
			return {
				...state,
				applicationConfiguration: (action as GetApplicationConfigurationSuccessful).payload.applicationConfiguration
			};
		case InstallApplicationUseCaseActionTypes.SetApplicationConfiguration:
			return {
				...state,
				applicationConfiguration: (action as SetApplicationConfiguration).payload.applicationConfiguration
			};
		case InstallApplicationUseCaseActionTypes.SetApplicationConfigurationError:
			return {
				...state,
				setApplicationConfigurationError: (action as SetApplicationConfigurationError).payload.error
			};
		case InstallApplicationUseCaseActionTypes.GetherApplicationConfiguration:
			return {
				...state,
				setApplicationConfigurationError: ''
			};
		case InstallApplicationUseCaseActionTypes.InstallCustomUrlSchemaError:
			return {
				...state,
				installCustomUrlSchemaError: (action as InstallCustomUrlSchemaError).payload.error
			};
		case InstallApplicationUseCaseActionTypes.CreateApplicationDatabaseError:
			return {
				...state,
				createApplicationDatabaseError: (action as CreateApplicationDatabaseError).payload.error
			};
		case InstallApplicationUseCaseActionTypes.DownloadSdeError:
			return {
				...state,
				downloadSdeError: (action as DownloadSdeError).payload.error
			};
		case InstallApplicationUseCaseActionTypes.OpenDownloadSdeScreen:
			return {
				...state,
				downloadSdeDownloadId: (action as OpenDownloadSdeScreen).payload.downloadId
			};
		default:
			return state;
	}
}

export interface InstallApplicationUseCaseStore extends ApplicationStore {
	useCase: InstallApplicationUseCaseState
}

export const installApplicationUseCaseReducers = {
	useCase: installApplicationUseCaseReducer
};

const getStore = createFeatureSelector<InstallApplicationUseCaseStore>('installApplicationUseCase');
const getState = createSelector(getStore, state => state.useCase);
export const getApplicationConfiguration = createSelector(getState, state => state.applicationConfiguration);
export const getSetApplicationConfigurationError = createSelector(getState, state => state.setApplicationConfigurationError);
export const getInstallCustomUrlSchemaError = createSelector(getState, state => state.installCustomUrlSchemaError);
export const getCreateApplicationDatabaseError = createSelector(getState, state => state.createApplicationDatabaseError);
export const getDownloadSdeError = createSelector(getState, state => state.downloadSdeError);
export const getDownloadSdeDownloadId = createSelector(getState, state => state.downloadSdeDownloadId);

@Injectable()
export class InstallApplicationUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router,
		private readonly installationService: InstallationService) {}

	@Effect()
	public installApplication$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.InstallApplication),
		map(() => new GetApplicationConfiguration()));

	@Effect()
	public getApplicationConfiguration$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.GetApplicationConfiguration),
		mergeMap(() => this.installationService.getApplicationConfiguration().pipe(
			map((applicationConfiguration: ApplicationConfiguration) =>
				new GetApplicationConfigurationSuccessful({ applicationConfiguration: applicationConfiguration }))
		)));

	@Effect()
	public getApplicationConfigurationSuccessful$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.GetApplicationConfigurationSuccessful),
		map(() => new GatherApplicationConfiguration()));

	@Effect()
	public gatherApplicationConfiguration$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.GatherApplicationConfiguration),
		map(() => new OpenApplicationConfigurationScreen()));

	@Effect({ dispatch: false })
	public openApplicationConfigurationScreen$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.OpenApplicationConfigurationScreen),
		tap(() => this.router.navigate(['/installation/application-configuration'])));

	@Effect()
	public setApplicationConfiguration$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.SetApplicationConfiguration),
		map((action: SetApplicationConfiguration) => action.payload.applicationConfiguration),
		mergeMap(applicationConfiguration => this.installationService.setApplicationConfiguration(applicationConfiguration).pipe(
			map(() => new GetherCustomUrlSchemaData()),
			catchError(error => of(new SetApplicationConfigurationError({ error: error })))
		))
	);

	@Effect()
	public getherCustomUrlSchemaData$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.GetherCustomUrlSchemaData),
		map(() => new OpenCustomUrlSchemaScreen()));

	@Effect({ dispatch: false })
	public openCustomUrlSchemaScreen$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.OpenCustomUrlSchemaScreen),
		tap(() => this.router.navigate(['/installation/custom-url-schema'])));

	@Effect()
	public installCustomUrlSchema$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.InstallCustomUrlSchema),
		map((action: InstallCustomUrlSchema) => action.payload.customUrlSchema),
		mergeMap(customUrlSchema => this.installationService.installCustomUrlSchema(customUrlSchema).pipe(
			map(() => new CreateApplicationDatabase()),
			catchError(error => of(new InstallCustomUrlSchemaError({ error: error })))
		))
	);

	@Effect()
	public createApplicationDatabase$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.CreateApplicationDatabase),
		mergeMap(() => this.installationService.createApplicationDatabase().pipe(
			map(() => new DownloadSde()),
			catchError(error => of(new CreateApplicationDatabaseError({ error: error })))
		))
	);

	@Effect()
	public downloadSde$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.DownloadSde),
		mergeMap(() => this.installationService.startDownloadSde().pipe(
				map((downloadId: string) => new OpenDownloadSdeScreen({ downloadId: downloadId })),
				catchError(error => of(new DownloadSdeError({ error: error }))))
		)
	);

	@Effect({ dispatch: false })
	public openDownloadSdeScreen$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.OpenDownloadSdeScreen),
		tap(() => this.router.navigate(['/installation/download-sde'])));
}
