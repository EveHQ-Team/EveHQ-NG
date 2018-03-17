import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User} from 'modules/users/models/user';
import { Authenticate } from 'modules/users/models/authenticate';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
	public login({ username, password }: Authenticate): Observable<User> {
		/**
		 * Simulate a failed login to display the error
		 * message for the login form.
		 */
		if (username !== 'test') {
			return _throw('Invalid username or password');
		}

		return of({
			name: 'User',
			password: '',
			isLogInRequired: true,
			email: ''
		});
	}

	public logout() {
		return of(true);
	}
}
