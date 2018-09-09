import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationConfigurationEditorComponent } from
	'modules/installation/application-configuration-editor/application-configuration-editor.component';
import { SharedModule } from 'modules/shared/shared.module';
import { SsoConfigurationEditorComponent } from 'modules/installation/sso-configuration-editor/sso-configuration-editor.component';
import { ConfigurationModule } from 'modules/configuration/configuration.module';

const installationRoutes: Routes = [
	{
		path: 'application-configuration',
		component: ApplicationConfigurationEditorComponent
	},
	{
		path: 'sso-configuration',
		component: SsoConfigurationEditorComponent
	},
	{
		path: 'required-databases',
		component: SsoConfigurationEditorComponent // TODO: implement RequiredDatabasesScreenComponent
	}
];

@NgModule({
	imports: [
		SharedModule,
		ConfigurationModule,
		RouterModule.forChild(installationRoutes)
	],
	declarations: [
		ApplicationConfigurationEditorComponent,
		SsoConfigurationEditorComponent
	]
})
export class InstallationModule {}
