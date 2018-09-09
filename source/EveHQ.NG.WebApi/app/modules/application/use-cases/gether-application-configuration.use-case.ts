import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationConfiguration } from 'application-configuration';
import { ConfigurationStateActionTypes } from 'modules/application/stores/configuration.state';
import { SaveApplicationConfiguration } from 'modules/application/stores/configuration.state';
import {LoadApplicationConfiguration} from 'modules/application/stores/configuration.state';

export enum GetherApplicationConfigurationUseCaseActionTypes {
	GetherApplicationConfigurationStart = '[GETHER APPLICATION CONFIGURATION] Gether Application Configuration Start',
	OpenApplicationConfigurationScreen = '[GETHER APPLICATION CONFIGURATION] Open Application Configuration Screen',
	GetherApplicationConfigurationSave = '[GETHER APPLICATION CONFIGURATION] Gether Application Configuration Save',
	GetherApplicationConfigurationSuccess = '[GETHER APPLICATION CONFIGURATION] Gether Application Configuration Success'
}

export class GetherApplicationConfigurationStart implements Action {
	public readonly type: string = GetherApplicationConfigurationUseCaseActionTypes.GetherApplicationConfigurationStart;
}

export class OpenApplicationConfigurationScreen implements Action {
	public readonly type: string = GetherApplicationConfigurationUseCaseActionTypes.OpenApplicationConfigurationScreen;
}

export class GetherApplicationConfigurationSave implements Action {
	constructor(public readonly applicationConfiguration: ApplicationConfiguration) {}

	public readonly type: string = GetherApplicationConfigurationUseCaseActionTypes.GetherApplicationConfigurationSave;
}

export class GetherApplicationConfigurationSuccess implements Action {
	public readonly type: string = GetherApplicationConfigurationUseCaseActionTypes.GetherApplicationConfigurationSuccess;
}


@Injectable()
export class GetherApplicationConfigurationUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router) {}

	// Use case start.
	@Effect()
	public gatherApplicationConfiguration$ = this.actions$.pipe(
		ofType(GetherApplicationConfigurationUseCaseActionTypes.GetherApplicationConfigurationStart),
		map(() => new LoadApplicationConfiguration()));

	@Effect()
	public loadApplicationConfigurationSuccess$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.LoadApplicationConfigurationSuccess),
		map(() => new OpenApplicationConfigurationScreen()));

	// STEP: Open the Application configuration screen.
	@Effect({ dispatch: false })
	public openApplicationConfigurationScreen$ = this.actions$.pipe(
		ofType(GetherApplicationConfigurationUseCaseActionTypes.OpenApplicationConfigurationScreen),
		tap(() => this.router.navigate(['/installation/application-configuration'])));

	// STEP: Save the application configuration.
	@Effect()
	public readonly getherApplicationConfigurationSave$ = this.actions$.pipe(
		ofType(GetherApplicationConfigurationUseCaseActionTypes.GetherApplicationConfigurationSave),
		map((action: GetherApplicationConfigurationSave) => action.applicationConfiguration),
		map(applicationConfiguration => new SaveApplicationConfiguration(applicationConfiguration)));

	@Effect()
	public readonly saveApplicationConfigurationSuccess$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.SaveApplicationConfigurationSuccess),
		map(() => new GetherApplicationConfigurationSuccess()));
}
