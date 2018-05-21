import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSelectorComponent } from 'modules/authentication/profile-selector/profile-selector.component';
import { LoginComponent } from 'modules/authentication/login/login.component';

export const authenticationRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'select-profile',
		component: ProfileSelectorComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(authenticationRoutes)
	],
	declarations: [
		ProfileSelectorComponent,
		LoginComponent
	]
})
export class AuthenticationModule {
}
