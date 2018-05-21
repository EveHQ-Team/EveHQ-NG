import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { ApplicationUser } from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile';


@Injectable()
export class UserService {
	// TODO: Add real calls to backend.
	public getUser(): Observable<ApplicationUser | undefined> {
		console.warn('loading from permanent store the application user...');
		return Observable.of(this.user);
	}

	public setUser(user: ApplicationUser, password: string): Observable<ApplicationUser> {
		console.warn('storing to the permanent store the application user and its password...');
		this.user = user;
		return of(user);
	}

	public getUserProfiles(): Observable<MetaGameProfile[] | undefined> {
		console.warn('loading from the permanent store user profiles...');
		return Observable.of(this.profiles);
	}

	public setUserProfiles(profiles: MetaGameProfile[]): Observable<MetaGameProfile[]> {
		console.warn('storing to the permanent store user profiles...');
		this.profiles = profiles;
		return of(profiles);
	}

	private user: ApplicationUser | undefined = undefined;
	private profiles: MetaGameProfile[] | undefined = undefined;
}
