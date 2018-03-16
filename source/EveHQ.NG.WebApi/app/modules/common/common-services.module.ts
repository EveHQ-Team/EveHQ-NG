import { NgModule, ModuleWithProviders } from '@angular/core';
import { AuthenticationGuard } from 'modules/common/services/authentication-guard.service';
import { ApiService } from 'modules/common/services/api.service';
import { RomanNumberPipe } from 'modules/common/pipes/roman-number.pipe';
import { LogService } from 'modules/common/services/log.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';

@NgModule({})
export class CommonServicesModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: CommonServicesModule,
			providers: [
				AuthenticationGuard,
				ApiService,
				LogService,
				ApiEndpointsService
			]
		};
	}
}
