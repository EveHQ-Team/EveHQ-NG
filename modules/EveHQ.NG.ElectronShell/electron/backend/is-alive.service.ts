import { SupportsInjection } from 'good-injector';
import { LogBase } from '../infrastructure/log-base';
import { ApiService } from './api.service';
import { HttpStatusCode } from './http-status-code';

@SupportsInjection
export class IsAliveService {
	constructor(
		private readonly api: ApiService,
		private readonly log: LogBase) {}

	public async isBackendServiceAlive(): Promise<boolean> {
		return this.api.get('isalive')
			.then(response => response.status === HttpStatusCode.RequestDoneSuccessfully)
			.catch(() => {
					this.log.error('An error occured while trying to check is Backend-service alive.');
					return false;
				}
			);
	}

}
