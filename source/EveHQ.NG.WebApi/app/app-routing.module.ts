import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from 'login-page/login-page.component';
import { CharacterInfoPageComponent } from 'character-info-page/character-info-page.component';

const routes: Routes = [
	{
		path: '',
		component: LoginPageComponent
	},
	{
		path: 'login',
		component: LoginPageComponent
	},
	{
		path: 'character-info',
		component: CharacterInfoPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
