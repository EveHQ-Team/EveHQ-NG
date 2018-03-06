import 'zone.js/dist/zone-mix';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'app-routing.module';
import { ApiService } from 'services/api.service';
import { LoginPageComponent } from 'login-page/login-page.component';
import { CurrentCharacterService } from 'services/current-character.service';
import { CharacterInfoPageComponent } from 'character-info-page/character-info-page.component';
import { RomanNumberPipe } from 'services/roman-number.pipe';
import { LogService } from 'services/log.service';
import { ApiEndpointsService } from 'services/api-endpoints.service';
import { ShellComponent } from './shell/shell.component';
import { MenuBarComponent } from './shell/menu-bar/menu-bar.component';
import { ApplicationHeaderComponent } from './shell/application-header/application-header.component';
import { ApplicationFooterComponent } from './shell/application-footer/application-footer.component';

@NgModule({
	declarations: [
		LoginPageComponent,
		CharacterInfoPageComponent,
		RomanNumberPipe,
		ShellComponent,
		MenuBarComponent,
		ApplicationHeaderComponent,
		ApplicationFooterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [
		ApiService,
		CurrentCharacterService,
		LogService,
		ApiEndpointsService
	],
	bootstrap: [ShellComponent]
})
export class AppModule {
}
