import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
	public login(password: string): Observable<boolean> {
		return of(password === '1111');
	}
}
