import { Injectable } from '@angular/core';
import { ApplicationUser } from 'modules/application/models/application-user';

@Injectable()
export class UserRepository {
	public get isUserCreated(): boolean {
		return this._user !== undefined;
	}

	public get user(): ApplicationUser {
		return this._user;
	}

	public set user(value: ApplicationUser) {
		if (value === undefined || value === null) {
			throw new Error('No application user provided.');
		}

		this._user = value;
		//TODO: Save to web-service.
	}

	private _user: ApplicationUser;
}
