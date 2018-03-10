import 'zone.js/dist/zone-mix';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApiService } from 'services/api.service';
import { RomanNumberPipe } from 'services/roman-number.pipe';
import { LogService } from 'services/log.service';
import { ApiEndpointsService } from 'services/api-endpoints.service';
import { ShellComponent } from 'application-module/shell/shell.component';
import { MenuBarComponent } from 'application-module/shell/menu-bar/menu-bar.component';
import { ApplicationHeaderComponent } from 'application-module/shell/application-header/application-header.component';
import { ApplicationFooterComponent } from 'application-module/shell/application-footer/application-footer.component';
import { UserDashboardComponent } from 'application-module/user-dashboard/user-dashboard.component';
import { NewUserComponent } from 'application-module/new-user/new-user.component';
import { ComponentHostDirective } from 'application-module/services/component-host.directive';
import { UserManagerService } from 'application-module/services/user-manager.service';
import { UserLoginComponent } from 'application-module/user-login/user-login.component';
import { MetaGameProfileSelectorComponent } from
	'application-module/meta-game-profile-selector/meta-game-profile-selector.component';
import { ApplicationStartupComponent } from './application-startup/application-startup.component';
import { ShellService } from 'application-module/services/shell.service';
import { CharacterModule } from 'character-module/character.module';

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
		BrowserModule,
		FormsModule,
		HttpClientModule,
		CharacterModule,
		ApplicationRoutingModule
	],
	providers: [
		ApiService,
		LogService,
		ApiEndpointsService,
		UserManagerService,
		ShellService
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
