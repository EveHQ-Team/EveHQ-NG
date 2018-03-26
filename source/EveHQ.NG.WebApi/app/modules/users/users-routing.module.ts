import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'modules/application/services/authentication-guard.service';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { CreateUserComponent } from 'modules/users/create-user/create-user.component';
import { UserLoginComponent } from 'modules/users/user-login/user-login.component';

export const usersRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'users/dashboard'
	},
	{
		path: 'dashboard',
		canActivate: [AuthenticationGuard],
		component: UserDashboardComponent
	},
	{
		path: 'create',
		component: CreateUserComponent
	},
	{
		path: 'login',
		component: UserLoginComponent
	}
];
