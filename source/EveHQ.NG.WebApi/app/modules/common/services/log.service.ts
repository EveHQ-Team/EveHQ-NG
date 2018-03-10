import { Injectable } from '@angular/core';
import { ApiService } from 'modules/common/services/api.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';

@Injectable()
export class LogService {

	constructor(
		private readonly api: ApiService,
		private readonly endpoints: ApiEndpointsService) {
	}

	public isVerboseLogging = false;

	public info(message: string): void {
		if (!this.isVerboseLogging) {
			return;
		}

		this.api.post(`${this.endpoints.logging}/information`, message).subscribe();
	}

	public error(message: string, error: any): void {
		this.api.post(`${this.endpoints.logging}/error`, `${message} ${error}`).subscribe();
	}
}
