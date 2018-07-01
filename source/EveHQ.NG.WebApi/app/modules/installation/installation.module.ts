import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationConfigurationEditorComponent } from
	'modules/installation/application-configuration-editor/application-configuration-editor.component';
import { CustomUrlSchemaEditorComponent } from 'modules/installation/custom-url-schema-editor/custom-url-schema-editor.component';
import { SdeDownloaderComponent } from 'modules/installation/sde-downloader/sde-downloader.component';
import { SharedModule } from 'modules/shared/shared.module';
import { ApplicationConfigurationFormComponent } from './application-configuration-form/application-configuration-form.component';

const installationRoutes: Routes = [
	{
		path: 'application-configuration',
		component: ApplicationConfigurationEditorComponent
	},
	{
		path: 'custom-url-schema',
		component: CustomUrlSchemaEditorComponent
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
		ApplicationConfigurationEditorComponent,
		CustomUrlSchemaEditorComponent,
		SdeDownloaderComponent,
		ApplicationConfigurationFormComponent
	]
})
export class InstallationModule {}
