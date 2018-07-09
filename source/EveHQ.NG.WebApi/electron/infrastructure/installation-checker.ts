import axios from 'axios';
import { ApplicationConfigurationHandler } from './application-configuration-handler';

import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class InstallationChecker {
	constructor(private readonly applicationConfigurationHandler: ApplicationConfigurationHandler) {}

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
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				const response = await axios.get(`http://localhost:${portNumber}/api/isalive`);
				if (response.status !== 200) {
					return resolve(false);
				}

				resolve(true);
			}
			catch (error) {
				return resolve(false);
			}
		});
	}
}
