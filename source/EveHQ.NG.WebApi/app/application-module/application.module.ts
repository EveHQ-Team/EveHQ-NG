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
import { ShellComponent } from './shell/shell.component';
import { MenuBarComponent } from './shell/menu-bar/menu-bar.component';
import { ApplicationHeaderComponent } from './shell/application-header/application-header.component';
import { ApplicationFooterComponent } from './shell/application-footer/application-footer.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
	declarations: [
		RomanNumberPipe,
		ShellComponent,
		MenuBarComponent,
		ApplicationHeaderComponent,
		ApplicationFooterComponent,
		UserDashboardComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ApplicationRoutingModule
	],
	providers: [
		ApiService,
		LogService,
		ApiEndpointsService
	],
	bootstrap: [ShellComponent]
})
export class ApplicationModule {
}
