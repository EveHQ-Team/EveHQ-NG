import { Injectable } from '@angular/core';
import { ApplicationUser } from 'modules/application/models/application-user';

@Injectable()
export class UserManagerService {
	public get isUserCreated(): boolean {
		return this._user !== undefined;
	}

	public get user(): ApplicationUser {
		return this._user;
	}

	private _user: ApplicationUser;
}
