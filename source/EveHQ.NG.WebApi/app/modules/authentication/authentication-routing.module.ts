import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'modules/application/services/authentication-guard.service';
import { LoginPageComponent } from 'modules/authentication/login-page/login-page.component';
import { ProfileSelectorComponent } from 'modules/authentication/profile-selector/profile-selector.component';

export const authenticationRoutes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'select-profile',
		canActivate: [AuthenticationGuard],
		component: ProfileSelectorComponent
	}
];
