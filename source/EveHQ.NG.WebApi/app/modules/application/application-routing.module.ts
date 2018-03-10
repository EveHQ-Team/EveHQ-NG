import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from 'modules/application/user-dashboard/user-dashboard.component';
import { ApplicationStartupComponent } from 'modules/application/startup/startup.component';

const routes: Routes = [
	{
		path: '',
		component: ApplicationStartupComponent
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
