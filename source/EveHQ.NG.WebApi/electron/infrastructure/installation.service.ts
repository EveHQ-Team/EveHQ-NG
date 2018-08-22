import { ipcMain } from 'electron';
import { InstallationIpc } from '../ipc-shared/installation-ipc';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';
import { SystemErrorDescriber } from './system-error-describer';
import { IpcResult } from '../ipc-shared/ipc-result';
import { ApplicationConfigurationHandler } from './application-configuration-handler';
import { InstallationChecker} from './installation-checker';
import { SupportsInjection } from 'good-injector';
import { BackendService } from './backend-service';
import { SsoConfiguration } from '../ipc-shared/sso-configuration';
import { SsoConfigurationHandler } from './sso-configuration-handler';

@SupportsInjection
export class InstallationService {
	constructor(
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly installationChecker: InstallationChecker,
		private readonly backendService: BackendService,
		private readonly applicationConfigurationHandler: ApplicationConfigurationHandler,
		private readonly ssoConfigurationHandler: SsoConfigurationHandler) {
		this.registerIsApplicationInstalled();
		this.registerGetApplicationConfiguration();
		this.registerSetApplicationConfiguration();
		this.registerGetSsoConfiguration();
		this.registerSetSsoConfiguration();
	}

	private registerIsApplicationInstalled(): void {
		ipcMain.on(
			InstallationIpc.isApplicationInstalled,
			async (event: any) => {
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
			async (event: any) => {
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
					await this.backendService.restart();
					result = IpcResult.success();
				}
				catch (error) {
					result = IpcResult.error('Can not change to the application configuration.', error);
				}

				event.sender.send(InstallationIpc.setApplicationConfiguration, result);
			}
		);
	}

	private registerGetSsoConfiguration(): void {
		ipcMain.on(
			InstallationIpc.getSsoConfiguration,
			async (event: any) => {
				let result: IpcResult;
				try {
					result = IpcResult.success(await this.ssoConfigurationHandler.getSsoConfiguration());
				}
				catch (error) {
					result = IpcResult.error('Cant not get the SSO-configuration from file.', error);
				}

				event.sender.send(InstallationIpc.getSsoConfiguration, result);
			});
	}

	private registerSetSsoConfiguration(): void {
		ipcMain.on(
			InstallationIpc.setSsoConfiguration,
			async (event: any, args: SsoConfiguration) => {
				let result: IpcResult;
				try {
					await this.ssoConfigurationHandler.setSsoConfiguration(args);
					result = IpcResult.success();
				}
				catch (error) {
					result = IpcResult.error('Can not change the SSO-configuration.', error);
				}

				event.sender.send(InstallationIpc.setSsoConfiguration, result);
			}
		);
	}

}
