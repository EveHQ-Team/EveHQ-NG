import * as path from 'path';
import * as fs from 'fs';
import { app } from 'electron';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';
import { TcpPort } from './tcp-port';
import { SystemErrorDescriber } from './system-error-describer';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';

@SupportsInjection
export class ApplicationConfigurationHandler {
	constructor(
		private readonly tcpPort: TcpPort,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {
		this.userDataFolderPath = app.getPath('userData');
		this.applicationConfigurationFilePath = path.join(this.userDataFolderPath, 'application-configuration.json');
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
			dataFolderPath: this.userDataFolderPath,
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
		return new Promise<void>((resolve, reject) => {
			const content = JSON.stringify(applicationaConfiguration);
			fs.writeFile(this.applicationConfigurationFilePath,
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

	private readonly applicationConfigurationFilePath: string;
	private readonly userDataFolderPath: string;
}
