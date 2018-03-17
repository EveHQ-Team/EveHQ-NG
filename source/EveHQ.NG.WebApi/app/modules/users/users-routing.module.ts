import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGameProfileManagerComponent } from 'modules/users/meta-game-profile-manager/meta-game-profile-manager.component';
import { AuthenticationGuard } from 'modules/users/services/authentication-guard.service';
import { LoginRouteGuard } from 'modules/users/services/login-route-guard.service';
import { CreateUserRouteGuard } from 'modules/users/services/create-user-route-guard.service';
import { UserDashboardComponent } from 'modules/users/user-dashboard/user-dashboard.component';
import { NewUserComponent } from 'modules/users/new-user/new-user.component';
import { UserLoginComponent } from 'modules/users/user-login/user-login.component';

const dashboardUrl = 'dashboard';

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
	},
	{
		path: 'meta-game-profile-manager',
		canActivate: [AuthenticationGuard],
		component: MetaGameProfileManagerComponent
	}
];
/*
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule {
}
*/
