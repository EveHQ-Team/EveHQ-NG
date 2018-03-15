import 'zone.js/dist/zone-mix';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ApplicationRoutingModule } from 'modules/application/application-routing.module';

import { StoreModule } from '@ngrx/store';

import { reducers, metaReducers } from 'modules/application/stores/application-reducers.store'

import { ApiService } from 'modules/common/services/api.service';
import { RomanNumberPipe } from 'modules/common/pipes/roman-number.pipe';
import { LogService } from 'modules/common/services/log.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';
import { ShellComponent } from 'modules/application/shell/shell.component';
import { MenuBarComponent } from 'modules/application/shell-menu/shell-menu.component';
import { ApplicationHeaderComponent } from 'modules/application/shell-header/shell-header.component';
import { ApplicationFooterComponent } from 'modules/application/shell-footer/shell-footer.component';
import { UserDashboardComponent } from 'modules/application/user-dashboard/user-dashboard.component';
import { NewUserComponent } from 'modules/application/new-user/new-user.component';
import { ComponentHostDirective } from 'modules/application/services/component-host.directive';
import { UserLoginComponent } from 'modules/application/user-login/user-login.component';
import { MetaGameProfileSelectorComponent } from
	'modules/application/meta-game-profile-selector/meta-game-profile-selector.component';
import { StartupComponent as ApplicationStartupComponent } from 'modules/application/startup/startup.component';
import { CharacterModule } from 'modules/character/character.module';
import { MetaGameModule } from 'modules/meta-game/meta-game.module';
import { StartupContext } from 'modules/application/startup/startup.context';
import { UserRepository } from 'modules/application/services/user.repository';
import { NewInstallationContext } from 'modules/application/startup/new-installation.context';
import { PresentInstallationContext } from 'modules/application/startup/present-installation.context';

@NgModule({
	declarations: [
		RomanNumberPipe,
		ShellComponent,
		MenuBarComponent,
		ApplicationHeaderComponent,
		ApplicationFooterComponent,
		UserDashboardComponent,
		NewUserComponent,
		ComponentHostDirective,
		UserLoginComponent,
		MetaGameProfileSelectorComponent,
		ApplicationStartupComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CheckboxModule,
		InputTextModule,
		PasswordModule,
		CharacterModule,
		MetaGameModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		ApplicationRoutingModule
	],
	providers: [
		ApiService,
		LogService,
		ApiEndpointsService,
		StartupContext,
		UserRepository,
		NewInstallationContext,
		PresentInstallationContext
	],
	entryComponents: [
		NewUserComponent,
		UserLoginComponent,
		MetaGameProfileSelectorComponent
	],
	bootstrap: [ShellComponent]
})
export class ApplicationModule {
}
