import { Injectable } from '@angular/core';

@Injectable()
export class ApiEndpointsService {
	constructor() {
		
	}
	public get authenticationNotification() {
		return `${this.baseUri}/authentication-notification`;
	}

	public get characters() {
		return `${this.apiBaseUri}/characters`;
	}

	public get logging() {
		return `${this.apiBaseUri}/clientlogging`;
	}

	public get settings() {
		return `${this.apiBaseUri}/settings`;
	}

	private readonly baseUri = 'http://localhost:5000';
	private readonly apiBaseUri = `${this.baseUri}/api`;
}
