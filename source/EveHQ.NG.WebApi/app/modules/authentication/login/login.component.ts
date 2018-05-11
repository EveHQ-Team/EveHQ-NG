import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticateWithPassword } from 'modules/application/use-cases/login.use-case';
import {LoginUseCaseState} from 'modules/application/use-cases/login.use-case';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private readonly store: Store<LoginUseCaseState>) {}

	public ngOnInit() {}

	public login(): void {
		this.store.dispatch(new AuthenticateWithPassword({ password: '1111' }));
	}
}
