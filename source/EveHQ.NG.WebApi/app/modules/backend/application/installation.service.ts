import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { _throw } from 'rxjs/observable/throw';
import { CustomUrlSchema } from 'modules/application/models/custom-url-schema';
import { ipcRenderer } from 'electron';
import { Subject } from 'rxjs';
import { InstallationIpc } from 'installation-ipc';
import { ApplicationConfiguration } from 'modules/application/models/application-configuration';

export class InstallationService {
	public isApplicationInstalled(): Observable<boolean> {
		const subject = new Subject<boolean>();
		ipcRenderer.once(
			InstallationIpc.isApplicationInstalled,
			(event: any, argument: boolean) => {
				subject.next(argument);
				subject.complete();
			});

		ipcRenderer.send(InstallationIpc.isApplicationInstalled);
		return subject.asObservable();
	}

	public getApplicationConfiguration(): Observable<ApplicationConfiguration> {
		const subject = new Subject<ApplicationConfiguration>();
		ipcRenderer.once(
			InstallationIpc.getApplicationConfiguration,
			(event: any, argument: ApplicationConfiguration) => {
				subject.next(argument);
				subject.complete();
			});

		ipcRenderer.send(InstallationIpc.getApplicationConfiguration);;
		return subject.asObservable();
	}

	public setApplicationConfiguration(applicationConfiguration: ApplicationConfiguration): Observable<any> {
		console.warn('App conf API', applicationConfiguration);
		return empty();
		//return _throw('TODO: Error message');
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

}
