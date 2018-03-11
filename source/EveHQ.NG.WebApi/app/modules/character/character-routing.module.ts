import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterDashboardComponent } from 'modules/character/character-dashboard/character-dashboard.component';

const routes: Routes = [
	{
		path: 'character-dashboard',
		component: CharacterDashboardComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CharacterRoutingModule {
}
