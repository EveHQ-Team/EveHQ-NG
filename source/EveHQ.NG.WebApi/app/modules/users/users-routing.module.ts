import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'modules/authentication/services/authentication-guard.service';
import { LoginRouteGuard } from 'modules/authentication/services/login-route-guard.service';
import { CreateUserRouteGuard } from 'modules/authentication/services/create-user-route-guard.service';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { NewUserComponent } from 'modules/users/new-user/new-user.component';
import { UserLoginComponent } from 'modules/users/user-login/user-login.component';

const dashboardUrl = 'users/dashboard';

export const usersRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: dashboardUrl
	},
	{
		path: dashboardUrl,
		canActivate: [AuthenticationGuard],
		component: UserDashboardComponent
	},
	{
		path: 'create',
		canActivate: [CreateUserRouteGuard],
		component: NewUserComponent
	},
	{
		path: 'login',
		canActivate: [LoginRouteGuard],
		component: UserLoginComponent
	}
];
