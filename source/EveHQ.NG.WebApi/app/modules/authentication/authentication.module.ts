import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileSelectorComponent } from 'modules/authentication/profile-selector/profile-selector.component';
import { LoginComponent } from 'modules/authentication/login/login.component';
import { AuthenticationGuard } from 'modules/application/services/authentication-guard.service';
import { authenticationModuleReducers } from 'modules/authentication/authentication.store';
import { LoginUseCaseEffects } from 'modules/application/use-cases/login.use-case';

export const authenticationRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'select-profile',
		canActivate: [AuthenticationGuard],
		component: ProfileSelectorComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(authenticationRoutes)
	],
	declarations: [
		ProfileSelectorComponent,
		LoginComponent
	]
})
export class AuthenticationModule {
}
