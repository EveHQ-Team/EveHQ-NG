import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from 'modules/characters/characters-routing.module';
import { CharacterDashboardComponent } from 'modules/characters/character-dashboard/character-dashboard.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [CharacterDashboardComponent]
})
export class CharactersModule {
}
