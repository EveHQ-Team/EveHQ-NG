import { Injectable } from '@angular/core';
import { ApplicationConfigurationService } from 'modules/backend/application/application-configuration.service';

@Injectable()
export class ApiEndpointsService {
	constructor(applicationConfigurationService: ApplicationConfigurationService) {
		applicationConfigurationService.getAndNotifyOnChangeApplicationConfiguration()
			.subscribe(applicationConfiguration => this.portNumber = applicationConfiguration.backendServicePortNumber);
	}

	public get authenticationNotification() {
		return `${this.apiBaseUri}/authentication-notification`;
	}

	public get characters() {
		return `${this.apiBaseUri}/characters`;
	}

	public get logging() {
		return `${this.apiBaseUri}/clientlogging`;
	}

	public get settings() {
		return `${this.apiBaseUri}/settings`;
	}

	public get databases() {
		return `${this.apiBaseUri}/databases`;
	}

	private get apiBaseUri(): string {
		return `${this.apiHostUri}:${this.portNumber}/api`;
	}

	private apiHostUri = 'http://localhost';
	// ReSharper disable once PrivateVariableCanBeMadeReadonly Updated on observe a new value.
	private portNumber: number;
}
