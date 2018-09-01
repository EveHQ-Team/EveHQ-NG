import * as path from 'path';
import * as fse from 'fs-extra';
import { EventEmitter } from 'events';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';
import { TcpPort } from './tcp-port';
import { SystemErrorDescriber } from './system-error-describer';
import { SupportsInjection } from 'good-injector';
import { Folders} from './folders';

@SupportsInjection
export class ApplicationConfigurationHolder extends EventEmitter {
	constructor(
		private readonly tcpPort: TcpPort,
		private readonly systemErrorDescriber: SystemErrorDescriber) {
		super();
		this.applicationConfigurationFilePath = path.join(Folders.defaultDataFolderPath, 'application-configuration.json');
		this.initialize();
	}

	public async getApplicationConfiguration(): Promise<ApplicationConfiguration> {
		if (this.applicationConfiguration) {
			return Promise.resolve(this.applicationConfiguration);
		}

		return fse.readJSON(this.applicationConfigurationFilePath)
			.then(applicationConfiguration => {
				this.applicationConfiguration = applicationConfiguration;
				return applicationConfiguration;
			})
			.catch(error => `Can not read from the file '${this.applicationConfigurationFilePath}'. ` +
				`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
	}

	public async setApplicationConfiguration(applicationConfiguration: ApplicationConfiguration): Promise<void> {
		await this.validateAndCoerceApplicationConfiguration(applicationConfiguration);

		return fse.writeJSON(this.applicationConfigurationFilePath, applicationConfiguration)
			.then(() => {
				this.applicationConfiguration = applicationConfiguration;
				this.emit('changed', applicationConfiguration);
				return Promise.resolve();
			})
			.catch(error => Promise.reject(`Can not write to the file '${this.applicationConfigurationFilePath}'. ` +
				`The error was: ${this.systemErrorDescriber.describeError(error.code)}`));
	}

	private async validateAndCoerceApplicationConfiguration(applicationaConfiguration: ApplicationConfiguration): Promise<void> {
		const portNumber = applicationaConfiguration.backendServicePortNumber;
		if (portNumber < TcpPort.minPortNumber || portNumber > TcpPort.maxPortNumber) {
			return Promise.reject(`The port number ${portNumber} not in valid range.`);
		}

		if (!(await this.tcpPort.isPortFree(portNumber))) {
			return Promise.reject(`The port specified is occupied by some other service. Please choose another one.`);
		}

		applicationaConfiguration.dataFolderPath = path.normalize(applicationaConfiguration.dataFolderPath);
		if (!await fse.pathExists(applicationaConfiguration.dataFolderPath)) {
			return Promise.reject(`Data folder path ${applicationaConfiguration.dataFolderPath} does not exists.`);
		}

		return Promise.resolve();
	}

	private initialize(): void {
		if (fse.pathExistsSync(this.applicationConfigurationFilePath)) {
			this.applicationConfiguration = fse.readJSONSync(this.applicationConfigurationFilePath);
			return;
		}

		this.createDefaultApplicationConfiguration().then(applicationConfiguration => {
			fse.writeJSONSync(this.applicationConfigurationFilePath, applicationConfiguration);
			this.applicationConfiguration = fse.readJSONSync(this.applicationConfigurationFilePath);
		});
	}

	private async createDefaultApplicationConfiguration(): Promise<ApplicationConfiguration> {
		const portNumber = await this.tcpPort.getRandomFreePort();
		return {
			dataFolderPath: Folders.defaultDataFolderPath,
			backendServicePortNumber: portNumber,
			isApplicationInstalled: false
		};
	}

	private applicationConfiguration: ApplicationConfiguration;
	private readonly applicationConfigurationFilePath: string;
}
