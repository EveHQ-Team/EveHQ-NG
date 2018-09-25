import { SupportsInjection } from 'good-injector';
import { IpcApplicationConfigurationService } from './ipc-application-configuration.serive';
import { IpcSsoConfigurationService } from './ipc-sso-configuration.service';

@SupportsInjection
export class IpcServiceCollection {
	constructor(
		public readonly ipcApplicationConfigurationService: IpcApplicationConfigurationService,
		public readonly ipcSsoConfigurationService: IpcSsoConfigurationService) {}

	public registerIpcServices(): void {
		this.ipcApplicationConfigurationService.register();
		this.ipcSsoConfigurationService.register();
	}
}
