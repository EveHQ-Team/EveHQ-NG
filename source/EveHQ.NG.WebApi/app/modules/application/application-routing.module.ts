import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'authentication',
		loadChildren: 'modules/authentication/authentication.module#AuthenticationModule'
	},
	{
		path: 'users',
		loadChildren: 'modules/users/users.module#UsersModule'
	},
	{
		path: 'characters',
		loadChildren: 'modules/characters/characters.module#CharactersModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
