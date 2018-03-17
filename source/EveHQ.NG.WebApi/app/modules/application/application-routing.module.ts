import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartupComponent } from 'modules/application/startup/startup.component';
import { AuthenticationGuard } from 'modules/users/services/authentication-guard.service';
import { UsersModule } from 'modules/users/users.module';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		canActivate: [AuthenticationGuard],
		component: StartupComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
