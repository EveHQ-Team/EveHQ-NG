import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from 'modules/character/character-routing.module';
import { CharacterDashboardComponent } from 'modules/character/character-dashboard/character-dashboard.component';

@NgModule({
	imports: [
		CommonModule,
		CharacterRoutingModule
	],
	declarations: [CharacterDashboardComponent]
})
export class CharacterModule {
}
