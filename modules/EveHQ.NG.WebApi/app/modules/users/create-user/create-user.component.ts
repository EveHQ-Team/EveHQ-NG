import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SetShellHeader } from 'modules/application/stores/shell.state';
import { Store, select } from '@ngrx/store';
import { ApplicationUser} from 'modules/application/models/application-user';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile'
import { v4 as uuid } from 'node-uuid';
import {
	AddProfile,
	RemoveProfile,
	getUser,
	getPassword,
	getProfiles }
	from 'modules/application/use-cases/create-user.use-case';
import { CreateUserUseCaseState } from 'modules/application/use-cases/create-user.use-case';
import { CreateUserModel } from 'modules/application/models/create-user-model';
import { CreateUserSuccess } from 'modules/application/use-cases/create-user.use-case';

@Component({
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, AfterViewInit {
	constructor(private readonly store: Store<CreateUserUseCaseState>) {
		this.user$ = this.store.pipe(select(getUser));
		this.password$ = this.store.pipe(select(getPassword));
		this.profiles$ = this.store.pipe(select(getProfiles));
	}

	public readonly user$: Observable<ApplicationUser>;
	public readonly password$: Observable<string>;
	public readonly profiles$: Observable<MetaGameProfile[]>;
	public readonly error$: Observable<string | undefined>;

	public ngOnInit(): void {}

	public ngAfterViewInit(): void {
		this.store.dispatch(new SetShellHeader('Create the user'));
	}

	private addProfile(profileName: string): void {
		this.store.dispatch(new AddProfile({ profileToAdd: { id: uuid(), name: profileName } }));
	}

	private removeProfile(profileId: string): void {
		this.store.dispatch(new RemoveProfile({ profileId: profileId }));
	}

	private save(): void {
		Observable.combineLatest(
				this.user$,
				this.password$,
				this.profiles$,
				(user, password, profiles) => ({
					user: user,
					password: password,
					profiles: profiles
				}))
			.map((model: CreateUserModel) => {
				this.store.dispatch(new CreateUserSuccess({ userData: model }));
			})
			.subscribe();
	}
}
