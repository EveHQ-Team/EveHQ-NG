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
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				if (!await this.applicationConfigurationHandler.isApplicationConfigurationCreated()) {
					return resolve(false);
				}

				const applicationConfiguration = await this.applicationConfigurationHandler.readApplicationConfiguration();
				resolve(await this.isBackendServiceAvailableOnPort(applicationConfiguration.backendServicePortNumber));
			}
			catch (error) {
				reject(`Can not validate application installation. The error was: '${error}'`);
			}
		});
	}

	private async isBackendServiceAvailableOnPort(portNumber: number): Promise<boolean> {
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
