import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartupComponent } from 'modules/application/startup/startup.component';
import { AuthenticationGuard } from 'modules/common/services/authentication-guard.service';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		canActivate: [AuthenticationGuard],
		component: StartupComponent
	},
	{
		path: 'users',
		loadChildren: 'modules/users/users.module#UsersModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
