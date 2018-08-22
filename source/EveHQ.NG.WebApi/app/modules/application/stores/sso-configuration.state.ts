import { Injectable } from '@angular/core';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ApplicationStore } from 'modules/application/stores/application.state';
import { SsoConfiguration } from 'sso-configuration';
import { SsoConfigurationService} from 'modules/backend/application/sso-configuration.service';

export enum SsoConfigurationStateActionTypes {
	SetSsoConfiguration = '[SSO CONFIGURATION] Set SSO Configuration',
	SetSsoConfigurationSuccess = '[SSO CONFIGURATION] Set SSO Configuration Success',
	SetSsoConfigurationError = '[SSO CONFIGURATION] Set SSO Configuration Error'
}

export class SetSsoConfiguration implements Action {
	constructor(public readonly ssoConfiguration: SsoConfiguration) {
		console.warn('####SetSsoConfiguration');
	}

	public readonly type = SsoConfigurationStateActionTypes.SetSsoConfiguration;
}

export class SetSsoConfigurationSuccess implements Action {
	public readonly type = SsoConfigurationStateActionTypes.SetSsoConfigurationSuccess
}

export class SetSsoConfigurationError implements Action {
	constructor(public readonly error: string) {}

	public readonly type = SsoConfigurationStateActionTypes.SetSsoConfigurationError;
}

export type SsoConfigurationStateActions =
	| SetSsoConfiguration
	| SetSsoConfigurationError;

export interface SsoConfigurationState {
	ssoConfiguration: SsoConfiguration,
	setSsoConfigurationError: string;
}

const initialState: SsoConfigurationState = {
	ssoConfiguration: {
		clientId: '9158bdcbc32a49e29044be4266b029dd',
		clientSecret: 'SJb4jaOUHbVm3KSrrPsJKo82cmiYxvoXtlEIgu5R',
		callbackUrl: 'eveauth-evehq-ng://sso-auth/'
	},
	setSsoConfigurationError: ''
};

export function ssoConfigurationStateReducer(state = initialState, action: SsoConfigurationStateActions): SsoConfigurationState {
	switch (action.type) {
		case SsoConfigurationStateActionTypes.SetSsoConfiguration:
			return {
				...state,
				ssoConfiguration: (action as SetSsoConfiguration).ssoConfiguration
			};
		case SsoConfigurationStateActionTypes.SetSsoConfigurationError:
			return {
				...state,
				setSsoConfigurationError: (action as SetSsoConfigurationError).error
			};
		default:
			return state;
	}
}

const getSsoConfigurationState = createFeatureSelector<SsoConfigurationState>('ssoConfiguration');
export const getSsoConfiguration = createSelector(
	getSsoConfigurationState,
	(state: SsoConfigurationState) => state.ssoConfiguration);
export const getSetSsoConfigurationError = createSelector(
	getSsoConfigurationState,
	(state: SsoConfigurationState) => state.setSsoConfigurationError);

@Injectable()
export class SsoConfigurationStateEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly ssoConfigurationService: SsoConfigurationService) {}

	@Effect()
	public readonly setSsoConfiguration$ = this.actions$.pipe(
		ofType(SsoConfigurationStateActionTypes.SetSsoConfiguration),
		map((action: SetSsoConfiguration) => action.ssoConfiguration),
		mergeMap((ssoConfiguration: SsoConfiguration) => this.ssoConfigurationService.setSsoConfiguration(ssoConfiguration).pipe(
			map(() => new SetSsoConfigurationSuccess()),
			catchError(error => of(new SetSsoConfigurationError(error))))));
}
