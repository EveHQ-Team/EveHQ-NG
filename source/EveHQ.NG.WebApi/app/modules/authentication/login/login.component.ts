import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationModuleState } from 'modules/authentication/authentication.store';
import { AuthenticateWithPassword } from 'modules/application/use-cases/login.use-case';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private readonly store: Store<AuthenticationModuleState>) {
	}

	public ngOnInit() {
	}

	public login(): void {
		this.store.dispatch(new AuthenticateWithPassword('1111'));
	}
}
