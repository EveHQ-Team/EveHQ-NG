import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiService } from 'modules/common/services/api.service';
import { LogService } from 'modules/common/services/log.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';
import { ApplicationConfigurationService } from 'modules/backend/application/application-configuration.service';
import { SsoConfigurationService } from 'modules/backend/application/sso-configuration.service';
import { DatabasesService } from 'modules/common/services/databases.service';

@NgModule({})
export class CommonServicesModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: CommonServicesModule,
			providers: [
				ApiService,
				LogService,
				ApiEndpointsService,
				ApplicationConfigurationService,
				SsoConfigurationService,
				DatabasesService
			]
		};
	}
}
