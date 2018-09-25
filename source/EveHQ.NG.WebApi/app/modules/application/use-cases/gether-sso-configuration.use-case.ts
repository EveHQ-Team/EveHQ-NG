import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { SsoConfiguration } from 'sso-configuration';
import { ConfigurationStateActionTypes, SaveSsoConfiguration } from 'modules/application/stores/configuration.state';

export enum GetherSsoConfigurationUseCaseActionTypes {
	GetherSsoConfigurationStart = '[GETHER SSO CONFIGURATION] Gether SSO Configuration Start',
	OpenSsoConfigurationScreen = '[GETHER SSO CONFIGURATION] Open SSO Configuration Screen',
	GetherSsoConfigurationSave = '[GETHER SSO CONFIGURATION] Gether SSO Configuration Save',
	GetherSsoConfigurationSuccess = '[GETHER SSO CONFIGURATION] Gether SSO Configuration Success'
}

export class GetherSsoConfigurationStart implements Action {
	public readonly type: string = GetherSsoConfigurationUseCaseActionTypes.GetherSsoConfigurationStart;
}

export class OpenSsoConfigurationScreen implements Action {
	public readonly type: string = GetherSsoConfigurationUseCaseActionTypes.OpenSsoConfigurationScreen;
}

export class GetherSsoConfigurationSave implements Action {
	constructor(public readonly ssoConfiguration: SsoConfiguration) {}

	public readonly type: string = GetherSsoConfigurationUseCaseActionTypes.GetherSsoConfigurationSave;
}

export class GetherSsoConfigurationSuccess implements Action {
	public readonly type: string = GetherSsoConfigurationUseCaseActionTypes.GetherSsoConfigurationSuccess;
}


@Injectable()
export class GetherSsoConfigurationUseCaseEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly router: Router) {}

	// Use case start.
	@Effect()
	public gatherSsoConfiguration$ = this.actions$.pipe(
		ofType(GetherSsoConfigurationUseCaseActionTypes.GetherSsoConfigurationStart),
		map(() => new OpenSsoConfigurationScreen()));

	// STEP: Open the Sso configuration screen.
	@Effect({ dispatch: false })
	public openSsoConfigurationScreen$ = this.actions$.pipe(
		ofType(GetherSsoConfigurationUseCaseActionTypes.OpenSsoConfigurationScreen),
		tap(() => this.router.navigate(['/installation/sso-configuration'])));

	// STEP: Save the Sso configuration.
	@Effect()
	public readonly save = this.actions$.pipe(
		ofType(GetherSsoConfigurationUseCaseActionTypes.GetherSsoConfigurationSave),
		map((action: GetherSsoConfigurationSave) => action.ssoConfiguration),
		map(ssoConfiguration => new SaveSsoConfiguration(ssoConfiguration)));

	@Effect()
	public readonly saveSsoConfigurationSuccess$ = this.actions$.pipe(
		ofType(ConfigurationStateActionTypes.SaveSsoConfigurationSuccess),
		map(() => new GetherSsoConfigurationSuccess()));
}
