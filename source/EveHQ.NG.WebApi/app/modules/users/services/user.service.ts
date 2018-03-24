import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'modules/users/models/user';


@Injectable()
export class UserService {
	public getUser(): Observable<User | undefined> {
		console.warn('user loading...');
		return Observable.of(this.user);
	}

	public setUser(user: User): Observable<User> {
		console.warn('user setting...');
		this.user = user;
		return Observable.of(user);
	}

	private user: User | undefined = undefined;
	//private user: User | undefined = { name: 'username', email: 'useremail', password: 'userpassword', isLogInRequired: false };
}
