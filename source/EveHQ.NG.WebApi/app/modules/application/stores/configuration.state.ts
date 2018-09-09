import { Injectable } from '@angular/core';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { SsoConfiguration } from 'sso-configuration';
import { ApplicationConfiguration } from 'application-configuration';
import {SsoConfigurationService} from 'modules/backend/application/sso-configuration.service';
import {ApplicationConfigurationService} from 'modules/backend/application/application-configuration.service';

export interface ConfigurationState {
	applicationConfiguration: ApplicationConfiguration;
	loadApplicationConfigurationError: any;
	saveApplicationConfigurationError: any;
	ssoConfiguration: SsoConfiguration;
	loadSsoConfigurationError: any;
	saveSsoConfigurationError: any;
}

const initialState: ConfigurationState = {
	applicationConfiguration: {
		isApplicationInstalled: false,
		dataFolderPath: '',
		backendServicePortNumber: 5000
	},
	loadApplicationConfigurationError: '',
	saveApplicationConfigurationError: '',
	ssoConfiguration: {
		clientId: '9158bdcbc32a49e29044be4266b029dd',
		clientSecret: 'SJb4jaOUHbVm3KSrrPsJKo82cmiYxvoXtlEIgu5R',
		callbackUrl: 'eveauth-evehq-ng://sso-auth/'
	},
	loadSsoConfigurationError: '',
	saveSsoConfigurationError: ''
};

export enum ConfigurationStateActionTypes {
	LoadApplicationConfiguration = '[CONFIGURATION STATE] Load Application Configuration',
	LoadApplicationConfigurationSuccess = '[CONFIGURATION STATE] Load Application Configuration Success',
	LoadApplicationConfigurationFail = '[CONFIGURATION STATE] Load Application Configuration Fail',
	SaveApplicationConfiguration = '[CONFIGURATION STATE] Save Application Configuration',
	SaveApplicationConfigurationSuccess = '[CONFIGURATION STATE] Save Application Configuration Success',
	SaveApplicationConfigurationFail = '[CONFIGURATION STATE] Save Application Configuration Fail',
	SetApplicationConfiguration = '[CONFIGURATION STATE] Set Application Configuration',
	LoadSsoConfiguration = '[CONFIGURATION STATE] Load SSO Configuration',
	LoadSsoConfigurationSuccess = '[CONFIGURATION STATE] Load SSO Configuration Success',
	LoadSsoConfigurationFail = '[CONFIGURATION STATE] Load SSO Configuration Fail',
	SaveSsoConfiguration = '[CONFIGURATION STATE] Save SSO Configuration',
	SaveSsoConfigurationSuccess = '[CONFIGURATION STATE] Save SSO Configuration Success',
	SaveSsoConfigurationFail = '[CONFIGURATION STATE] Save SSO Configuration Fail',
	SetSsoConfiguration = '[CONFIGURATION STATE] Set SSO Configuration',
}

export class LoadApplicationConfiguration implements Action {
	public readonly type: string = ConfigurationStateActionTypes.LoadApplicationConfiguration;
}

export class LoadApplicationConfigurationSuccess implements Action {
	public readonly type: string = ConfigurationStateActionTypes.LoadApplicationConfigurationSuccess;
}

export class LoadApplicationConfigurationFail implements Action {
	constructor(public readonly error: any) {}

	public readonly type: string = ConfigurationStateActionTypes.LoadApplicationConfigurationFail;
}

export class SaveApplicationConfiguration implements Action {
	constructor(public readonly applicationConfiguration: ApplicationConfiguration) {}

	public readonly type: string = ConfigurationStateActionTypes.SaveApplicationConfiguration;
}

export class SaveApplicationConfigurationSuccess implements Action {
	public readonly type: string = ConfigurationStateActionTypes.SaveApplicationConfigurationSuccess;
}

export class SaveApplicationConfigurationFail implements Action {
	constructor(public readonly error: any) {}

	public readonly type: string = ConfigurationStateActionTypes.SaveApplicationConfigurationFail;
}

export class SetApplicationConfiguration implements Action {
	constructor(public readonly applicationConfiguration: ApplicationConfiguration) {}

	public readonly type: string = ConfigurationStateActionTypes.SetApplicationConfiguration;
}

export class LoadSsoConfiguration implements Action {
	public readonly type: string = ConfigurationStateActionTypes.LoadSsoConfiguration;
}

export class LoadSsoConfigurationSuccess implements Action {
	public readonly type: string = ConfigurationStateActionTypes.LoadSsoConfigurationSuccess;
}

export class LoadSsoConfigurationFail implements Action {
	constructor(public readonly error: any) {}

	public readonly type: string = ConfigurationStateActionTypes.LoadSsoConfigurationFail;
}

export class SaveSsoConfiguration implements Action {
	constructor(public readonly ssoConfiguration: SsoConfiguration) {}

	public readonly type: string = ConfigurationStateActionTypes.SaveSsoConfiguration;
}

export class SaveSsoConfigurationSuccess implements Action {
	public readonly type: string = ConfigurationStateActionTypes.SaveSsoConfigurationSuccess;
}

export class SaveSsoConfigurationFail implements Action {
	constructor(public readonly error: any) {}

	public readonly type: string = ConfigurationStateActionTypes.SaveSsoConfigurationFail;
}

export class SetSsoConfiguration implements Action {
	constructor(public readonly ssoConfiguration: SsoConfiguration) {}

	public readonly type: string = ConfigurationStateActionTypes.SetSsoConfiguration;
}

export type ConfigurationStateActions =
	| LoadApplicationConfiguration
	| LoadApplicationConfigurationSuccess
	| LoadApplicationConfigurationFail
	| SaveApplicationConfiguration
	| SetApplicationConfiguration
	| SaveApplicationConfigurationSuccess
	| SaveApplicationConfigurationFail
	| LoadSsoConfiguration
	| LoadSsoConfigurationSuccess
	| LoadApplicationConfigurationFail
	| SaveSsoConfiguration
	| SaveSsoConfigurationSuccess
	| SaveSsoConfigurationFail
	| SetSsoConfiguration

export function configurationStateReducer(
	state = initialState,
	action: ConfigurationStateActions): ConfigurationState {
	switch (action.type) {
		case ConfigurationStateActionTypes.LoadApplicationConfigurationSuccess:
			return {
				...state,
				loadApplicationConfigurationError: ''
			};
		case ConfigurationStateActionTypes.LoadApplicationConfigurationFail:
			return {
				...state,
				loadApplicationConfigurationError: (action as LoadApplicationConfigurationFail).error
			};
		case ConfigurationStateActionTypes.SaveApplicationConfigurationSuccess:
			return {
				...state,
				saveApplicationConfigurationError: ''
			};
		case ConfigurationStateActionTypes.SaveApplicationConfigurationFail:
			return {
				...state,
				saveApplicationConfigurationError: (action as SaveApplicationConfigurationFail).error
			};
		case ConfigurationStateActionTypes.SetApplicationConfiguration:
			return {
				...state,
				applicationConfiguration: (action as SetApplicationConfiguration).applicationConfiguration,
			};
		case ConfigurationStateActionTypes.LoadSsoConfigurationSuccess:
			return {
				...state,
				loadSsoConfigurationError: ''
			};
		case ConfigurationStateActionTypes.LoadSsoConfigurationFail:
			return {
				...state,
				loadSsoConfigurationError: (action as LoadSsoConfigurationFail).error
			};
		case ConfigurationStateActionTypes.SaveSsoConfigurationSuccess:
			return {
				...state,
				saveSsoConfigurationError: ''
			};
		case ConfigurationStateActionTypes.SaveSsoConfigurationFail:
			return {
				...state,
				saveSsoConfigurationError: (action as SaveSsoConfigurationFail).error
			};
		case ConfigurationStateActionTypes.SetSsoConfiguration:
			return {
				...state,
				ssoConfiguration: (action as SetSsoConfiguration).ssoConfiguration
			};
		default:
			return state;
	}
}

@Injectable()
export class ConfigurationStateEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly applicationConfigurationService: ApplicationConfigurationService,
		private readonly ssoConfigurationService: SsoConfigurationService) {}

	@Effect()
	public readonly loadApplicationConfiguration$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.LoadApplicationConfiguration),
		mergeMap(() => this.applicationConfigurationService.getApplicationConfiguration()
			.pipe(mergeMap((applicationConfiguration: ApplicationConfiguration) => from([
				new SetApplicationConfiguration(applicationConfiguration),
				new LoadApplicationConfigurationSuccess()
			])))),
		catchError(error => of(new LoadApplicationConfigurationFail(error))));

	@Effect()
	public readonly saveApplicationConfiguration$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.SaveApplicationConfiguration),
		map((action: SaveApplicationConfiguration) => action.applicationConfiguration),
		mergeMap(applicationConfiguration => this.applicationConfigurationService.setApplicationConfiguration(applicationConfiguration)
			.pipe(mergeMap(() => from([
				new SetApplicationConfiguration(applicationConfiguration),
				new SaveApplicationConfigurationSuccess()
			])))),
		catchError(error => of(new SaveApplicationConfigurationFail(error))));

	@Effect()
	public readonly loadSsoConfiguration$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.LoadSsoConfiguration),
		mergeMap(() => this.ssoConfigurationService.getSsoConfiguration()
			.pipe(mergeMap((ssoConfiguration: SsoConfiguration) => from([
				new SetSsoConfiguration(ssoConfiguration),
				new LoadSsoConfigurationSuccess()
			])))),
		catchError(error => of(new LoadSsoConfigurationFail(error))));


	@Effect()
	public readonly saveSsoConfiguration$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.SaveSsoConfiguration),
		map((action: SaveSsoConfiguration) => action.ssoConfiguration),
		mergeMap((ssoConfiguration: SsoConfiguration) => this.ssoConfigurationService.setSsoConfiguration(ssoConfiguration)
			.pipe(mergeMap(() => from([
				new SetSsoConfiguration(ssoConfiguration),
				new SaveSsoConfigurationSuccess()
			])))),
		catchError(error => of(new SaveSsoConfigurationFail(error))));
}
