import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
	public login(password: string): Observable<boolean> {
		if (password !== '1111') {
			return _throw('Invalid password.');
		}

		return of(true);
	}
}
