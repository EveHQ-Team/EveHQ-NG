import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterRoutingModule } from 'character-module/character-routing.module';
import { CharacterDashboardComponent } from 'character-module/character-dashboard/character-dashboard.component';

@NgModule({
	imports: [
		CommonModule,
		CharacterRoutingModule
	],
	declarations: [CharacterDashboardComponent]
})
export class CharacterModule {
}
