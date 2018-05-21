import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDashboardComponent } from 'modules/characters/character-dashboard/character-dashboard.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: CharacterDashboardComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		CharacterDashboardComponent
	]
})
export class CharactersModule {}
