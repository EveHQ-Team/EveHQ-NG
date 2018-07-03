import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { CustomUrlSchema } from 'modules/application/models/custom-url-schema';
import { ipcRenderer } from 'electron';
import { Subject } from 'rxjs';
import { InstallationIpc } from 'installation-ipc';
import { ApplicationConfiguration } from 'application-configuration';
import { IpcResult } from 'ipc-result';

export class InstallationService {
	public isApplicationInstalled(): Observable<boolean> {
		const subject = new Subject<boolean>();
		ipcRenderer.once(
			InstallationIpc.isApplicationInstalled,
			(event: any, result: IpcResult) => this.notifySubscribers(subject, result));

		ipcRenderer.send(InstallationIpc.isApplicationInstalled);
		return subject.asObservable();
	}

	public getApplicationConfiguration(): Observable<ApplicationConfiguration> {
		const subject = new Subject<ApplicationConfiguration>();
		ipcRenderer.once(
			InstallationIpc.getApplicationConfiguration,
			(event: any, result: IpcResult) => this.notifySubscribers(subject, result));

		ipcRenderer.send(InstallationIpc.getApplicationConfiguration);
		return subject.asObservable();
	}

	public setApplicationConfiguration(applicationConfiguration: ApplicationConfiguration): Observable<void> {
		const subject = new Subject<void>();
		ipcRenderer.once(
			InstallationIpc.setApplicationConfiguration,
			(event: any, result: IpcResult) => this.notifySubscribers(subject, result));

		ipcRenderer.send(InstallationIpc.setApplicationConfiguration, applicationConfiguration);
		return subject.asObservable();
	}

	public installCustomUrlSchema(customUrlSchema: CustomUrlSchema): Observable<any> {
		return empty();
		//return _throw('TODO: Error message');
	}

	public createApplicationDatabase(): Observable<any> {
		return empty();
		//return _throw('TODO: Error message');
	}

	public startDownloadSde(): Observable<string> {
		return of('guid1');
		//return _throw('TODO: Error message');
	}

	private notifySubscribers<TResult>(subject: Subject<TResult>, result: IpcResult): void {
		console.warn('notifySubscribers: ', result);
		if (result.isSuccessful) {
			subject.next(result.result);
			subject.complete();
		}
		else {
			subject.error(result.error);
		}
	}
}
