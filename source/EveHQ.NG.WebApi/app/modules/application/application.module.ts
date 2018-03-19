import 'zone.js/dist/zone-mix';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from 'modules/application/application-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from 'modules/application/stores/application-reducers.store'

import { CommonServicesModule } from 'modules/common/common-services.module';
import { ShellComponent } from 'modules/application/shell/shell.component';
import { MenuBarComponent } from 'modules/application/shell-menu/shell-menu.component';
import { ApplicationHeaderComponent } from 'modules/application/shell-header/shell-header.component';
import { ApplicationFooterComponent } from 'modules/application/shell-footer/shell-footer.component';
import { StartupComponent as ApplicationStartupComponent } from 'modules/application/startup/startup.component';
import { CharacterModule } from 'modules/character/character.module';
import { AuthenticationModule } from 'modules/authentication/authentication.module';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CharacterModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		CommonServicesModule.forRoot(),
		AuthenticationModule,
		ApplicationRoutingModule
	],
	declarations: [
		ShellComponent,
		MenuBarComponent,
		ApplicationHeaderComponent,
		ApplicationFooterComponent,
		ApplicationStartupComponent
	],
	bootstrap: [ShellComponent]
})
export class ApplicationModule {
}
