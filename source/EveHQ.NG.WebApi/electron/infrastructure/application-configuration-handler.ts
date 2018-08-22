import * as path from 'path';
import * as fs from 'fs';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';
import { TcpPort } from './tcp-port';
import { SystemErrorDescriber } from './system-error-describer';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';
import { DataFolderManager } from './data-folder-manager';

@SupportsInjection
export class ApplicationConfigurationHandler {
	constructor(
		private readonly tcpPort: TcpPort,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase,
		private readonly dataFolderManager: DataFolderManager) {
		this.applicationConfigurationFilePath = path.join(this.dataFolderManager.defaultDataFolderPath, 'application-configuration.json');
	}

	public async isApplicationConfigurationCreated(): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			fs.access(
				this.applicationConfigurationFilePath,
				error => {
					if (error) {
						this.log.error(
							`An error occured on access to the file '${this.applicationConfigurationFilePath}'. ` +
							`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
					}

					resolve(!error);
				});
		});
	}

	public async createDefaultApplicationConfiguration(): Promise<ApplicationConfiguration> {
		const portNumber = await this.tcpPort.getRandomFreePort();
		return {
			dataFolderPath: this.dataFolderManager.defaultDataFolderPath,
			backendServicePortNumber: portNumber
		};
	}

	public async readApplicationConfiguration(): Promise<ApplicationConfiguration> {
		return new Promise<ApplicationConfiguration>((resolve, reject) => {
			fs.readFile(this.applicationConfigurationFilePath,
				{ encoding: 'utf8' },
				(error, content) => {
					if (!error) {
						resolve(JSON.parse(content));
					}
					else {
						reject(
							`Can not read from the file '${this.applicationConfigurationFilePath}'. ` +
							`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
					}
				});
		});
	}

	public async writeApplicationConfiguration(applicationaConfiguration: ApplicationConfiguration): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {

			this.validateAndCoerceApplicationConfiguration(applicationaConfiguration)
				.catch(error => reject(error));

			const content = JSON.stringify(applicationaConfiguration);
			const oldDataFolderPath = await this.isApplicationConfigurationCreated()
										? (await this.readApplicationConfiguration()).dataFolderPath
										: undefined;

			const newDataFolderPath = applicationaConfiguration.dataFolderPath;
			this.dataFolderManager.initializeDataFolder(newDataFolderPath, oldDataFolderPath)
				.catch(error => reject(error));

			fs.writeFile(
				this.applicationConfigurationFilePath,
				content,
				{ encoding: 'utf8' },
				error => {
					if (!error) {
						resolve();
					}
					else {
						reject(`Can not write to the file '${this.applicationConfigurationFilePath}'. ` +
							`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
					}
				});
		});
	}

	private async validateAndCoerceApplicationConfiguration(applicationaConfiguration: ApplicationConfiguration): Promise<void> {
		const portNumber = applicationaConfiguration.backendServicePortNumber;
		if (portNumber < TcpPort.minPortNumber || portNumber > TcpPort.maxPortNumber) {
			return Promise.reject(`The port number ${portNumber} not in valid range.`);
		}

		if (!(await this.tcpPort.isPortFree(portNumber))) {
			return Promise.reject(`The port specified is occupied by some other service. Please choose another one.`);
		}

		applicationaConfiguration.dataFolderPath = applicationaConfiguration.dataFolderPath.trim();
		fs.exists(
			applicationaConfiguration.dataFolderPath,
			doesExist => {
				if (!doesExist) {
					return Promise.reject(`Data folder path ${applicationaConfiguration.dataFolderPath} does not exists.`);
				}
			});

		return Promise.resolve();
	}

	private readonly applicationConfigurationFilePath: string;
}
