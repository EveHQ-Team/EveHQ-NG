import axios from 'axios';
import { ApplicationConfigurationHandler } from './application-configuration-handler';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';

@SupportsInjection
export class InstallationChecker {
	constructor(
		private readonly applicationConfigurationHandler: ApplicationConfigurationHandler,
		private readonly log: LogBase) {}

	public async isApplicationInstalled(): Promise<boolean> {
		return this.applicationConfigurationHandler.isApplicationConfigurationCreated();
	}

	public async isBackendServiceAvailableOnPort(portNumber: number): Promise<boolean> {
		return new Promise<boolean>(async (resolve) => {
			try {
				const requestDoneSuccessfully = 200;
				const response = await axios.get(`http://localhost:${portNumber}/api/isalive`);
				resolve(response.status === requestDoneSuccessfully);
			}
			catch (error) {
				this.log.error(`An error occured on try to check is Backend-service is alive: ${error.toString()}.`);
				return resolve(false);
			}
		});
	}
}
