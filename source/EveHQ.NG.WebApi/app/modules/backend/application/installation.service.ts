import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { _throw } from 'rxjs/observable/throw';
import { ApplicationConfiguration } from 'modules/application/models/application-configuration';
import { CustomUrlSchema } from 'modules/application/models/custom-url-schema';

export class InstallationService {
	// TODO: Add real calls to backend.
	public isApplicationInstalled(): Observable<boolean> {
		return of(false);
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
