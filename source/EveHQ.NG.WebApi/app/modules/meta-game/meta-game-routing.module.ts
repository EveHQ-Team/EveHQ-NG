import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGameProfileManagerComponent } from
	'modules/meta-game/meta-game-profile-manager/meta-game-profile-manager.component';

const routes: Routes = [
	{
		path: 'meta-game-profile-manager',
		component: MetaGameProfileManagerComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MetaGameRoutingModule {
}
