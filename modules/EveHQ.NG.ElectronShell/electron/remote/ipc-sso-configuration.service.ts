import { IpcServiceBase } from './ipc.service';
import { SystemErrorDescriber } from '../infrastructure/system-error-describer';
import { InstallationIpc } from '../ipc-shared/installation-ipc';
import { SupportsInjection } from 'good-injector';
import { SsoConfigurationHolder } from '../infrastructure/sso-configuration-holder';
import { SsoConfiguration } from '../ipc-shared/sso-configuration';


@SupportsInjection
export class IpcSsoConfigurationService extends IpcServiceBase {

	constructor(
		systemErrorDescriber: SystemErrorDescriber,
		private readonly ssoConfigurationHolder: SsoConfigurationHolder) {
		super(systemErrorDescriber);
	}

	public register(): void {
		this.registerGetHandler(
			InstallationIpc.getSsoConfiguration,
			() => this.ssoConfigurationHolder.getSsoConfiguration(),
			'Can not read the SSO configuration file.');

		this.registerSetHandler<SsoConfiguration>(
			InstallationIpc.setSsoConfiguration,
			ssoConfiguration => this.ssoConfigurationHolder.setSsoConfiguration(ssoConfiguration),
			'Can not write to the SSO configuration file.');
	}
}
