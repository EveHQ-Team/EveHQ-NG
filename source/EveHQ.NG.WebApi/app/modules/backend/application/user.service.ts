import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'modules/application/models/user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';


@Injectable()
export class UserService {
	// TODO: Add real calls to backend.
	public getUser(): Observable<User | undefined> {
		console.warn('user loading...');
		return Observable.of(this.user);
	}

	public setUser(user: User): Observable<User> {
		console.warn('user setting...');
		this.user = user;
		return Observable.of(user);
	}

	public getUserProfiles(): Observable<MetaGameProfile[] | undefined> {
		return Observable.of(this.profiles);
	}

	public setUserProfiles(profiles: MetaGameProfile[]): Observable<MetaGameProfile[]> {
		console.warn('profiles setting...');
		this.profiles = profiles;
		return Observable.of(profiles);
	}

	private user: User | undefined = undefined;
	private profiles: MetaGameProfile[] | undefined = undefined;
}
