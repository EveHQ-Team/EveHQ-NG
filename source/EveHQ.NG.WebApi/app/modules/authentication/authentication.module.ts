import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginRouteGuard } from 'modules/authentication/services/login-route-guard.service';
import { CreateUserRouteGuard } from 'modules/authentication/services/create-user-route-guard.service';
import { AuthenticationService } from 'modules/authentication/services/authentication.service';
import { UserBasedStatusEffects } from 'modules/authentication/stores/authentication.effects';
import { authenticationModuleReducers } from 'modules/authentication/stores/authentication-module.reducers';
import { AuthenticationGuard } from 'modules/authentication/services/authentication-guard.service';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('authentication', authenticationModuleReducers),
		EffectsModule.forFeature([UserBasedStatusEffects])
	],
	providers: [
		AuthenticationService,
		AuthenticationGuard,
		CreateUserRouteGuard,
		LoginRouteGuard
	]
})
export class AuthenticationModule {
}
