import { NgModule } from '@angular/core';
import { ApplicationConfigurationFormComponent } from
	'modules/configuration/application-configuration-form/application-configuration-form.component';
import { SsoConfigurationFormComponent } from 'modules/configuration/sso-configuration-form/sso-configuration-form.component';
import { SharedModule } from 'modules/shared/shared.module';

@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		ApplicationConfigurationFormComponent,
		SsoConfigurationFormComponent
	],
	exports: [
		ApplicationConfigurationFormComponent,
		SsoConfigurationFormComponent
	]
})
export class ConfigurationModule {}
