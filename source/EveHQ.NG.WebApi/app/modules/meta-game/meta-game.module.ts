import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaGameRoutingModule } from 'modules/meta-game/meta-game-routing.module';
import { MetaGameProfileManagerComponent } from 'modules/meta-game/meta-game-profile-manager/meta-game-profile-manager.component';

@NgModule({
	imports: [
		CommonModule,
		MetaGameRoutingModule
	],
	declarations: [MetaGameProfileManagerComponent]
})
export class MetaGameModule {
}
