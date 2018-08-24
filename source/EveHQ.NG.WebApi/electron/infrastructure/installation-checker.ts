import axios from 'axios';
import { ApplicationConfigurationHolder } from './application-configuration-handler';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';
import { SystemErrorDescriber } from './system-error-describer';

@SupportsInjection
export class InstallationChecker {
	constructor(
		private readonly applicationConfigurationHolder: ApplicationConfigurationHolder,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {}

	public async isApplicationInstalled(): Promise<boolean> {
		return this.applicationConfigurationHolder.getApplicationConfiguration()
			.then(applicationConfiguration => applicationConfiguration.isApplicationInstalled);
	}

	public async isBackendServiceAvailableOnPort(portNumber: number): Promise<boolean> {
		const requestDoneSuccessfully = 200;
		return axios.get(`http://localhost:${portNumber}/api/isalive`)
			.then(response => response.status === requestDoneSuccessfully)
			.catch(error => {
					this.log.error(
						`An error occured on try to check is Backend-service alive: ${this.systemErrorDescriber.describeError(error.code)}.`);
					return false;
				}
			);
	}
}
