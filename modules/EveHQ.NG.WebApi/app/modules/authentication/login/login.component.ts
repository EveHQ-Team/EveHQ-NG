import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthenticateWithPassword, getError } from 'modules/application/use-cases/login.use-case';
import { LoginUseCaseState } from 'modules/application/use-cases/login.use-case';
import { Observable } from 'rxjs';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	constructor(private readonly store: Store<LoginUseCaseState>) {
		this.error$ = this.store.pipe(select(getError));
	}

	public error$: Observable<string | undefined>;
	public password: string = '';

	public login(): void {
		this.store.dispatch(new AuthenticateWithPassword({ password: this.password }));

	}
}
