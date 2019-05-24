import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InstallationIpc } from 'installation-ipc';
import { SsoConfiguration } from 'sso-configuration';
import { IpcBackedServiceBase } from 'modules/backend/application/ipc-backed.service';

@Injectable()
export class SsoConfigurationService extends IpcBackedServiceBase {
	public getSsoConfiguration(): Observable<SsoConfiguration> {
		return this.getRequest(InstallationIpc.getSsoConfiguration);
	}

	public setSsoConfiguration(ssoConfiguration: SsoConfiguration): Observable<void> {
		return this.setRequest(InstallationIpc.setSsoConfiguration, ssoConfiguration);
	}
}
