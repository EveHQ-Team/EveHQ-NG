import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { SetShellHeader } from 'modules/application/stores/shell.actions';
import { Store, select } from '@ngrx/store';
import { UsersModuleState, getUser } from 'modules/users/stores/users-module.reducers';
import { Load, SetUser } from 'modules/users/stores/users.actions';
import { User } from 'modules/users/models/user';

@Component({
	selector: 'evehq-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, AfterViewInit {

	constructor(private readonly store: Store<UsersModuleState>) {
	}

	public ngOnInit(): void {
		this.user = { name: '', password: '', email: '', isLogInRequired: false };
	}

	public ngAfterViewInit(): void {
		this.store.dispatch(new SetShellHeader('Create the user'));
	}

	private save(): void {
		this.store.dispatch(new SetUser(this.user));
	}

	private user: User;
}
