import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
	GetherApplicationConfigurationUseCaseActionTypes,
	GetherApplicationConfigurationStart
} from 'modules/application/use-cases/gether-application-configuration.use-case';
import { GetherSsoConfigurationStart } from 'modules/application/use-cases/gether-sso-configuration.use-case';
import { GetherSsoConfigurationUseCaseActionTypes } from 'modules/application/use-cases/gether-sso-configuration.use-case';
import { CreateRequiredDatabasesUseCaseActionTypes } from 'modules/application/use-cases/create-required-databases.use-case';
import { CreateRequiredDatabasesStart } from 'modules/application/use-cases/create-required-databases.use-case';
import { from } from 'rxjs/observable/from';
import { SaveApplicationConfiguration } from 'modules/application/stores/configuration.state';
import { ApplicationStore, getApplicationConfiguration } from 'modules/application/stores/application.state';
import { StartApplication } from 'modules/application/use-cases/startup.use-case';

export enum InstallApplicationUseCaseActionTypes {
	InstallApplication = '[INSTALL APPLICATION USE CASE] Install Application',
	InstallApplicationComplete = '[INSTALL APPLICATION USE CASE] Install Application Complete',
}

export class InstallApplication implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.InstallApplication;
}

export class InstallApplicationComplete implements Action {
	public readonly type: string = InstallApplicationUseCaseActionTypes.InstallApplicationComplete;
}

@Injectable()
export class InstallApplicationUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly applicationStore: Store<ApplicationStore>) {}

	// STEP: Gether the application configuration.
	@Effect()
	public installApplication$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.InstallApplication),
		map(() => new GetherApplicationConfigurationStart()));

	// STEP: Gether SSO configuration.
	@Effect()
	public getherApplicationConfigurationSuccess$ = this.actions$.pipe(
		ofType(GetherApplicationConfigurationUseCaseActionTypes.GetherApplicationConfigurationSuccess),
		map(() => new GetherSsoConfigurationStart()));

	// STEP: Create required databases.
	@Effect()
	public getherSsoConfigurationSuccess$ = this.actions$.pipe(
		ofType(GetherSsoConfigurationUseCaseActionTypes.GetherSsoConfigurationSuccess),
		map(() => new CreateRequiredDatabasesStart()));

	@Effect()
	public createApplicationDatabase$ = this.actions$.pipe(
		ofType(CreateRequiredDatabasesUseCaseActionTypes.CreateRequiredDatabasesSuccess),
		mergeMap(() => this.applicationStore.pipe(
			select(getApplicationConfiguration),
			mergeMap(applicationConfiguration => {
				applicationConfiguration.isApplicationInstalled = true;
				return from([
					new SaveApplicationConfiguration(applicationConfiguration),
					new InstallApplicationComplete()
				]);
			}))));

	@Effect()
	public installApplicationComplete$ = this.actions$.pipe(
		ofType(InstallApplicationUseCaseActionTypes.InstallApplicationComplete),
		map(() => new StartApplication()));
}
