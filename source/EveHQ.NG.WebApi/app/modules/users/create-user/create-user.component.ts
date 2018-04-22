import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SetShellHeader } from 'modules/application/stores/shell.actions';
import { Store, select } from '@ngrx/store';
import { UsersModuleState, getUser, getProfiles } from 'modules/users/stores/users-module.reducers';
import { CreateUser, AddProfile, RemoveProfile } from 'modules/users/create-user/create-user.store';
import { ApplicationUser} from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile'
import { v4 as uuid } from 'node-uuid';

@Component({
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, AfterViewInit {

	constructor(private readonly store: Store<UsersModuleState>) {
		this.user$ = this.store.pipe(select(getUser));
		this.profiles$ = this.store.pipe(select(getProfiles));
	}

	public ngOnInit(): void {
	}

	public ngAfterViewInit(): void {
		this.store.dispatch(new SetShellHeader('Create the user'));
	}

	private addProfile(profileName: string): void {
		this.store.dispatch(new AddProfile({ id: uuid(), name: profileName }));
	}

	private removeProfile(profileId: string): void {
		this.store.dispatch(new RemoveProfile(profileId));
	}

	private save(): void {
		Observable.combineLatest(
				this.user$,
				this.profiles$,
				(user, profiles) => ({
					user: user,
					password: '1111',
					profiles: profiles
				}))
			.map((model) => {
				this.store.dispatch(new CreateUser(model));
			})
			.subscribe();
	}

	private readonly user$: Observable<ApplicationUser>;
	private readonly profiles$: Observable<MetaGameProfile[]>;
}
