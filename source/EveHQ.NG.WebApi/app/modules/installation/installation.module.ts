import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationConfigurationEditorComponent } from
	'modules/installation/application-configuration-editor/application-configuration-editor.component';
import { SdeDownloaderComponent } from 'modules/installation/sde-downloader/sde-downloader.component';
import { SharedModule } from 'modules/shared/shared.module';
import { ApplicationConfigurationFormComponent } from './application-configuration-form/application-configuration-form.component';
import { SsoConfigurationFormComponent } from './sso-configuration-form/sso-configuration-form.component';
import { SsoConfigurationEditorComponent } from './sso-configuration-editor/sso-configuration-editor.component';

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
		path: 'download-sde',
		component: SdeDownloaderComponent
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(installationRoutes)
	],
	declarations: [
		SdeDownloaderComponent,
		ApplicationConfigurationFormComponent,
		ApplicationConfigurationEditorComponent,
		SsoConfigurationFormComponent,
		SsoConfigurationEditorComponent
	]
})
export class InstallationModule {}
