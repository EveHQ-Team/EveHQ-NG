import { ipcMain, app } from 'electron';
import { InstallationIpc } from './ipc-shared/installation-ipc';
import * as path from 'path';
import * as fs from 'fs';
import { ApplicationConfiguration } from './ipc-shared/application-configuration';

export class InstallationService {
	constructor() {
		ipcMain.on(
			InstallationIpc.isApplicationInstalled,
			(event: any, args: any) => {
				event.sender.send(
					InstallationIpc.isApplicationInstalled,
					this.isApplicationInstalled);
			});

		ipcMain.on(
			InstallationIpc.getApplicationConfiguration,
			(event: any, args: any) => {
				event.sender.send(
					InstallationIpc.getApplicationConfiguration,
					this.isApplicationInstalled
					? this.readApplicationConfiguration()
					: this.createDefaultApplicationConfiguration());
			});

		ipcMain.on(
			InstallationIpc.setApplicationConfiguration,
			(event: any, args: any) => {
				this.writeApplicationConfiguration(args);
			}
		);
	}

	private get isApplicationInstalled(): boolean {
		// TODO: Check also file contents and service availability.
		return fs.existsSync(this.applicationConfigurationFilePath);
	}

	private get userDataFolderPath(): string {
		return app.getPath('userData');
	}

	private get applicationConfigurationFilePath(): string {
		return path.join(this.userDataFolderPath, 'application-configuration.json');
	}

	private createDefaultApplicationConfiguration(): ApplicationConfiguration {
		return {
			dataFolderPath: this.userDataFolderPath,
			backendServicePortNumber: this.getRandomFreePort()
		};
	}

	private getRandomFreePort(): number {
		// TODO: Auto-generate and check is port occupied.
		return 8888;
	}

	private readApplicationConfiguration(): ApplicationConfiguration {
		const content = fs.readFileSync(this.applicationConfigurationFilePath, { encoding: 'utf8' });
		const applicationConfiguration = JSON.parse(content) as ApplicationConfiguration;
		return applicationConfiguration;
	}

	private writeApplicationConfiguration(applicationaConfiguration: ApplicationConfiguration) {
		const content = JSON.stringify(applicationaConfiguration);
		fs.writeFileSync(this.applicationConfigurationFilePath, content, { encoding: 'utf8' });
	}
}
