import * as path from 'path';
import { app } from 'electron';
import * as fse from 'fs-extra';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';
import { SsoConfiguration } from '../ipc-shared/sso-configuration';
import { ApplicationConfigurationHandler } from './application-configuration-handler';
import { SystemErrorDescriber } from './system-error-describer';
import { ErrorCode } from './error-code';

@SupportsInjection
export class SsoConfigurationHandler {
	constructor(
		private readonly applicationConfigurationHandler: ApplicationConfigurationHandler,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {}

	public async getSsoConfiguration(): Promise<SsoConfiguration> {
		try {
			this.log.error('################1');
			const ssoConfiguration = await this.readSsoConfiguration();
			return Promise.resolve(ssoConfiguration);
		}
		catch (error) {
			this.log.error('################2');
			this.log.exception(error);
			if (error.code === ErrorCode.NoSuchFileOrDirectory) {
				this.log.error('################3');
				this.log.info('The SSO configuration file is not found. Create a new one with the default content.');
				const ssoConfiguration = { clientId: '', clientSecret: '', callbackUrl: '' };
				await this.writeSsoConfiguration(ssoConfiguration)
					.catch(async error => {
						this.log.error(
							`Can not write to the file '${await this.getSsoConfigurationFilePath()}' ` +
							'during creating of the default SSO-configuration file. ' +
							`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
						throw new Error(error);
					});

				this.log.error('################4');
				return Promise.resolve(ssoConfiguration);
			}

			this.log.error('################5');
			throw new Error(error);
		}
	}

	public async setSsoConfiguration(ssoConfiguration: SsoConfiguration): Promise<void> {
		await this.validateSsoConfiguration(ssoConfiguration);

		const oldCustomSchema = this.extractSchemaFromUrl((await this.getSsoConfiguration()).callbackUrl);
		const newCustomSchema = this.extractSchemaFromUrl(ssoConfiguration.callbackUrl);

		await this.writeSsoConfiguration(ssoConfiguration)
			.catch(async error => {
				this.log.error(
					`Can not write to the file '${await this.getSsoConfigurationFilePath()}' ` +
					'during creating of the default SSO-configuration file. ' +
					`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
				throw new Error(error);
			});

		if (oldCustomSchema.localeCompare(newCustomSchema, undefined, { sensitivity: 'accent' }) !== 0) {
			// TODO: Extract into platform-specific class. On Linux it done other way.
			app.removeAsDefaultProtocolClient(oldCustomSchema);
			app.setAsDefaultProtocolClient(newCustomSchema);
		}

		return Promise.resolve();
	}

	private async readSsoConfiguration(): Promise<SsoConfiguration> {
		return fse.readFile(await this.getSsoConfigurationFilePath(), 'utf8').then(content => JSON.parse(content));
	}

	private async writeSsoConfiguration(ssoConfiguration: SsoConfiguration): Promise<void> {
		return fse.writeFile(await this.getSsoConfigurationFilePath(), JSON.stringify(ssoConfiguration));
	}

	private extractSchemaFromUrl(url: string): string {
		return url.substr(0, url.indexOf(this.schemaSeparator));
	}

	private async getSsoConfigurationFilePath(): Promise<string> {
		const applicationConfiguration = await this.applicationConfigurationHandler.readApplicationConfiguration();
		return path.join(applicationConfiguration.dataFolderPath, 'sso-configuration.json');
	}

	private async validateSsoConfiguration(ssoConfiguration: SsoConfiguration): Promise<void> {
		if (!ssoConfiguration.clientId) {
			return Promise.reject('The Client ID should be specified.');
		}

		if (!ssoConfiguration.clientSecret) {
			return Promise.reject('The Client secret should be specified.');
		}

		if (!ssoConfiguration.callbackUrl) {
			return Promise.reject('The Callback URL should be specified.');
		}

		if (ssoConfiguration.callbackUrl.indexOf(this.schemaSeparator) === -1) {
			return Promise.reject('The Callback URL should contain a custome schema.');
		}

		return Promise.resolve();
	}

	private readonly schemaSeparator = '://';
}
