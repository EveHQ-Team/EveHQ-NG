import { Routes } from '@angular/router';
import { AuthenticationGuard } from 'modules/application/services/authentication-guard.service';
import { CharacterDashboardComponent } from 'modules/characters/character-dashboard/character-dashboard.component';

const dashboardPath = 'dashboard';
export const routes: Routes = [
	{
		path: 'characters',
		children: [
			{
				path: ':id/dashboard',
				component: CharacterDashboardComponent
			}]
	}
];
