import { IpcServiceBase } from './ipc.service';
import { SystemErrorDescriber } from '../infrastructure/system-error-describer';
import { InstallationIpc } from '../ipc-shared/installation-ipc';
import { ApplicationConfigurationHolder } from '../infrastructure/application-configuration-holder';
import { SupportsInjection } from 'good-injector';
import { ApplicationConfiguration } from '../ipc-shared/application-configuration';

@SupportsInjection
export class IpcApplicationConfigurationService extends IpcServiceBase {

	constructor(
		systemErrorDescriber: SystemErrorDescriber,
		private readonly applicationConfigurationHolder: ApplicationConfigurationHolder) {
		super(systemErrorDescriber);
	}

	public register(): void {
		this.registerGetHandler(
			InstallationIpc.getApplicationConfiguration,
			() => this.applicationConfigurationHolder.getApplicationConfiguration(),
			'Can not read the application configuration file.');

		this.registerSetHandler<ApplicationConfiguration>(
			InstallationIpc.setApplicationConfiguration,
			applicationConfiguration => this.applicationConfigurationHolder.setApplicationConfiguration(applicationConfiguration),
			'Can not write to the application configuration file.');
	}
}
