import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'modules/application/services/authentication-guard.service';
import { CharacterDashboardComponent } from 'modules/characters/character-dashboard/character-dashboard.component';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'characters/dashboard'
	},
	{
		path: 'dashboard',
		canActivate: [AuthenticationGuard],
		component: CharacterDashboardComponent
	}
];
