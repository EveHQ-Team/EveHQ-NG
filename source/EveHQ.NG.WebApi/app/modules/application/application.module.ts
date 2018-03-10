import 'zone.js/dist/zone-mix';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from './application-routing.module';
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
import { UserManagerService } from 'modules/application/services/user-manager.service';
import { UserLoginComponent } from 'modules/application/user-login/user-login.component';
import { MetaGameProfileSelectorComponent } from
	'modules/application/meta-game-profile-selector/meta-game-profile-selector.component';
import { ApplicationStartupComponent } from 'modules/application/startup/startup.component';
import { ShellService } from 'modules/application/services/shell.service';
import { CharacterModule } from 'modules/character/character.module';

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
