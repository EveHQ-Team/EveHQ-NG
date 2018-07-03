import axios from 'axios';
import { ApplicationConfigurationHandler } from './application-configuration-handler';

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
				const response = await axios.get(`http://localhost:${portNumber}/isalive`);
				console.warn('#### is alive response: ', response);
				if (response.status !== 200) {
					return resolve(false);
				}

				resolve(true);
			}
			catch (error) {
				console.error('#### is alive error: ', error);
				return resolve(false);
			}

/*
			axios.get(`http://localhost:${portNumber}/isalive`)
				.then((response: AxiosResponse) => {
					console.warn('#### is alive response: ', response);
					if (response.status !== 200) {
						return resolve(false);
					}

					resolve(true);
				})
				.catch((error) => {
					console.warn('#### is alive error: ', error);
					return resolve(false);
				});
*/
		});
	}
}
