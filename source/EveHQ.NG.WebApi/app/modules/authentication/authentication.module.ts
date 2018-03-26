import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSelectorComponent } from 'modules/authentication/profile-selector/profile-selector.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ProfileSelectorComponent,
		LoginPageComponent
	]
})
export class AuthenticationModule {
}
