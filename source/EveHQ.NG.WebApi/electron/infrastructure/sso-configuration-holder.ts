import * as path from 'path';
import { app } from 'electron';
import * as fse from 'fs-extra';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';
import { SsoConfiguration } from '../ipc-shared/sso-configuration';
import { SystemErrorDescriber } from './system-error-describer';
import { ErrorCode } from './error-code';
import { DataFolderManager } from './data-folder-manager';

@SupportsInjection
export class SsoConfigurationHolder {
	constructor(
		private readonly dataFolderManager: DataFolderManager,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {}

	public async getSsoConfiguration(): Promise<SsoConfiguration> {
		try {
			return Promise.resolve(await this.readSsoConfiguration());
		}
		catch (error) {
			this.log.exception(error);
			if (error.code !== ErrorCode.NoSuchFileOrDirectory) {
				throw new Error(error);
			}

			this.log.info('The SSO configuration file is not found. Create a new one with the default content.');
			const ssoConfiguration = { clientId: '', clientSecret: '', callbackUrl: '' };
			await this.writeSsoConfiguration(ssoConfiguration)
				.catch(async error => {
					this.log.error(
						`Can not write to the file '${this.configurationFilePath}' ` +
						'during creating of the default SSO-configuration file. ' +
						`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
					throw new Error(error);
				});

			return Promise.resolve(ssoConfiguration);
		}
	}

	public async setSsoConfiguration(ssoConfiguration: SsoConfiguration): Promise<void> {
		await this.validateSsoConfiguration(ssoConfiguration);

		const oldCustomSchema = this.extractSchemaFromUrl((await this.getSsoConfiguration()).callbackUrl);
		const newCustomSchema = this.extractSchemaFromUrl(ssoConfiguration.callbackUrl);

		await this.writeSsoConfiguration(ssoConfiguration)
			.catch(async error => {
				this.log.error(
					`Can not write to the file '${this.configurationFilePath}' ` +
					'during creating of the default SSO-configuration file. ' +
					`The error was: ${this.systemErrorDescriber.describeError(error.code)}`);
				throw new Error(error);
			});

		if (oldCustomSchema.localeCompare(newCustomSchema, undefined, { sensitivity: 'accent' }) !== 0) {
			// TODO: Extract into a platform-specific class. On Linux it done other way.
			app.removeAsDefaultProtocolClient(oldCustomSchema);
			app.setAsDefaultProtocolClient(newCustomSchema);
		}

		return Promise.resolve();
	}

	private async readSsoConfiguration(): Promise<SsoConfiguration> {
		return fse.readJSON(this.configurationFilePath);
	}

	private async writeSsoConfiguration(ssoConfiguration: SsoConfiguration): Promise<void> {
		return fse.writeJSON(this.configurationFilePath, ssoConfiguration);
	}

	private extractSchemaFromUrl(url: string): string {
		return url.substr(0, url.indexOf(this.schemaSeparator));
	}

	private get configurationFilePath(): string {
		return path.join(this.dataFolderManager.configurationFolderPath, 'sso-configuration.json');
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
