import { ipcMain } from 'electron';
import { InstallationIpc } from '../ipc-shared/installation-ipc';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';
import { SystemErrorDescriber } from './system-error-describer';
import { IpcResult } from '../ipc-shared/ipc-result';
import { ApplicationConfigurationHandler } from './application-configuration-handler';
import { InstallationChecker} from './installation-checker';
import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class InstallationService {
	constructor(
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly installationChecker: InstallationChecker,
		private readonly applicationConfigurationHandler: ApplicationConfigurationHandler) {
		this.registerIsApplicationInstalled();
		this.registerGetApplicationConfiguration();
		this.registerSetApplicationConfiguration();
	}

	private registerIsApplicationInstalled(): void {
		ipcMain.on(
			InstallationIpc.isApplicationInstalled,
			async (event: any, args: any) => {
				let result: IpcResult;
				try {
					result = IpcResult.success(await this.installationChecker.isApplicationInstalled());
				}
				catch (error) {
					result = IpcResult.error(
						'Can not get installation status.',
						this.systemErrorDescriber.describeError(error));
				}

				event.sender.send(InstallationIpc.isApplicationInstalled, result);
			});
	}

	private registerGetApplicationConfiguration(): void {
		ipcMain.on(
			InstallationIpc.getApplicationConfiguration,
			async (event: any, args: any) => {
				let result: IpcResult;
				try {
					result = IpcResult.success(
						await this.installationChecker.isApplicationInstalled()
						? await this.applicationConfigurationHandler.readApplicationConfiguration()
						: await this.applicationConfigurationHandler.createDefaultApplicationConfiguration());
				}
				catch (error) {
					result = IpcResult.error('Can not read the application configuration file.', error);
				}

				event.sender.send(InstallationIpc.getApplicationConfiguration, result);
			});
	}

	private registerSetApplicationConfiguration(): void {
		ipcMain.on(
			InstallationIpc.setApplicationConfiguration,
			async (event: any, args: ApplicationConfiguration) => {
				let result: IpcResult;
				try {
					await this.applicationConfigurationHandler.writeApplicationConfiguration(args);
					result = IpcResult.success();
				}
				catch (error) {
					result = IpcResult.error('Can not write to the application configuration.', error);
				}

				event.sender.send(InstallationIpc.setApplicationConfiguration, result);
			}
		);
	}

}
