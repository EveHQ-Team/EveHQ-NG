import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { empty } from 'rxjs/observable/empty';
import { SsoConfiguration} from 'sso-configuration';

@Injectable()
export class SsoConfigurationService {
	public setSsoConfiguration(ssoConfiguration: SsoConfiguration): Observable<any> {
		return empty();
	}
}
