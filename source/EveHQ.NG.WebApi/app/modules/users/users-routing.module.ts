import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'modules/users/services/authentication-guard.service';
import { LoginRouteGuard } from 'modules/users/services/login-route-guard.service';
import { CreateUserRouteGuard } from 'modules/users/services/create-user-route-guard.service';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { NewUserComponent } from 'modules/users/new-user/new-user.component';
import { UserLoginComponent } from 'modules/users/user-login/user-login.component';

const dashboardUrl = 'users/dashboard';

export const usersRoutes: Routes = [
	{
		path: 'users',
		pathMatch: 'full',
		redirectTo: dashboardUrl
	},
	{
		path: dashboardUrl,
		canActivate: [AuthenticationGuard],
		component: UserDashboardComponent
	},
	{
		path: 'users/create',
		canActivate: [CreateUserRouteGuard],
		component: NewUserComponent
	},
	{
		path: 'users/login',
		canActivate: [LoginRouteGuard],
		component: UserLoginComponent
	}
];
