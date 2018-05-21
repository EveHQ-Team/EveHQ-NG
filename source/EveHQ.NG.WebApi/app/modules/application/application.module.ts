import 'zone.js/dist/zone-mix';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationRoutingModule } from 'modules/application/application-routing.module';
import { BackendModule } from 'modules/backend/backend.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { applicationReducers, metaReducers } from 'modules/application/stores/application.state'
import { CommonServicesModule } from 'modules/common/common-services.module';
import { ShellComponent } from 'modules/application/shell/shell.component';
import { MenuBarComponent } from 'modules/application/shell-menu/shell-menu.component';
import { ApplicationHeaderComponent } from 'modules/application/shell-header/shell-header.component';
import { ApplicationFooterComponent } from 'modules/application/shell-footer/shell-footer.component';
import { shellReducers } from 'modules/application/stores/shell.state';
import { AuthenticationGuard } from 'modules/application/services/authentication-guard.service';
import { CreateUserUseCaseEffects, createUserUseCaseReducers } from 'modules/application/use-cases/create-user.use-case';
import { LoginUseCaseEffects, loginUseCaseReducers } from 'modules/application/use-cases/login.use-case';
import { StartupUseCaseEffects } from 'modules/application/use-cases/startup.use-case';
import { SelectProfileUseCaseEffects } from 'modules/application/use-cases/select-profile.use-case';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		BackendModule,
		StoreModule.forRoot(applicationReducers, { metaReducers }),
		StoreModule.forFeature('application', applicationReducers),
		StoreModule.forFeature('shell', shellReducers),
		StoreModule.forFeature('createUserUseCase', createUserUseCaseReducers),
		StoreModule.forFeature('loginUseCase', loginUseCaseReducers),
		EffectsModule.forRoot([
			StartupUseCaseEffects,
			CreateUserUseCaseEffects,
			LoginUseCaseEffects,
			SelectProfileUseCaseEffects
		]),
		CommonServicesModule.forRoot(),
		ApplicationRoutingModule
	],
	declarations: [
		ShellComponent,
		MenuBarComponent,
		ApplicationHeaderComponent,
		ApplicationFooterComponent
	],
	providers: [
		AuthenticationGuard
	],
	bootstrap: [ShellComponent]
})
export class ApplicationModule {}
