import axios, { AxiosResponse } from 'axios';
import { SupportsInjection } from 'good-injector';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';
import { LogBase } from '../infrastructure/log-base';
import { ApplicationConfigurationHolder } from '../infrastructure/application-configuration-holder';
import { SystemErrorDescriber } from '../infrastructure/system-error-describer';

@SupportsInjection
export class ApiService {
	constructor(
		private readonly applicationConfigurationHolder: ApplicationConfigurationHolder,
		private readonly log: LogBase,
		private readonly systemErrorDescriber: SystemErrorDescriber) {
		this.applicationConfigurationHolder.on(
			'changed',
			applicationConfiguration => this.applicationConfigurationChanged(applicationConfiguration));
		this.applicationConfigurationHolder.getApplicationConfiguration()
			.then(applicationConfiguration => this.applicationConfigurationChanged(applicationConfiguration));
	}

	public async get(request: string): Promise<AxiosResponse<any>> {
		const url = `http://localhost:${this.portNumber}/api/${request}`;
		try {
			return await axios.get(url);
		}
		catch (error) {
			const message = this.getRequestFailedErrorMessage(url, 'get', error);
			this.log.error(message);
			throw new Error(message);
		}
	}

	public async post(request: string, data?: any): Promise<AxiosResponse<any>> {
		const url = `http://localhost:${this.portNumber}/api/${request}`;
		try {
			return await axios.post(url, data);
		}
		catch (error) {
			const message = this.getRequestFailedErrorMessage(url, 'post', error);
			this.log.error(message);
			throw new Error(message);
		}
	}

	private getRequestFailedErrorMessage(url: string, verb: string, error: any): string {
		return `A ${verb} request to '${url}' failed. Error: ${this.systemErrorDescriber.describeError(error.code)}`;
	}

	private applicationConfigurationChanged(applicationConfiguration: ApplicationConfiguration): void {
		this.portNumber = applicationConfiguration.backendServicePortNumber;
	}

	private portNumber: number;
}
