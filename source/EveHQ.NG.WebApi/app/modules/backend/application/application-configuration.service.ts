import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InstallationIpc } from 'installation-ipc';
import { ApplicationConfiguration } from 'application-configuration';
import { IpcBackedServiceBase} from 'modules/backend/application/ipc-backed.service';

@Injectable()
export class ApplicationConfigurationService extends IpcBackedServiceBase {
	public getApplicationConfiguration(): Observable<ApplicationConfiguration> {
		return this.getRequest(InstallationIpc.getApplicationConfiguration);
	}

	public setApplicationConfiguration(applicationConfiguration: ApplicationConfiguration): Observable<void> {
		return this.setRequest(InstallationIpc.setApplicationConfiguration, applicationConfiguration);
	}

	public getAndNotifyOnChangeApplicationConfiguration(): Observable<ApplicationConfiguration> {
		return this.getAndNotifyOnChangeRequest(InstallationIpc.getApplicationConfiguration);
	}
}
