import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from 'modules/application/user-dashboard/user-dashboard.component';
import { StartupComponent } from 'modules/application/startup/startup.component';

const routes: Routes = [
	{
		path: '',
		component: StartupComponent
	},
	{
		path: 'user-dashboard',
		component: UserDashboardComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
