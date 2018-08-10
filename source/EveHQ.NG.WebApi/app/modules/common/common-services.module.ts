import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiService } from 'modules/common/services/api.service';
import { LogService } from 'modules/common/services/log.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';
import { InstallationService } from 'modules/backend/application/installation.service';
import { SsoConfigurationService } from 'modules/backend/application/sso-configuration.service';

@NgModule({})
export class CommonServicesModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: CommonServicesModule,
			providers: [
				ApiService,
				LogService,
				ApiEndpointsService,
				InstallationService,
				SsoConfigurationService
			]
		};
	}
}
