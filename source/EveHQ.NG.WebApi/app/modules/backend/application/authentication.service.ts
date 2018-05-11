import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
	public login(password: string): Observable<boolean> {
		console.warn('AuthenticationService.login');
		if (password !== '1111') {
			console.warn('AuthenticationService.login false');
			return _throw('Invalid password.');
		}

		console.warn('AuthenticationService.login true');
		return of(true);
	}
}
