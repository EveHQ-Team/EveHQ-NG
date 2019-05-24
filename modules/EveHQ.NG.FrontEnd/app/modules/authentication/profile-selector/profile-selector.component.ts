import { Component, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {MetaGameProfile} from 'modules/application/models/meta-game-profile';
import { Observable } from 'rxjs';
import {SelectProfileSuccess} from 'modules/application/use-cases/select-profile.use-case';
import {getCurrentUserProfiles} from 'modules/application/stores/application.state';
import {ApplicationState} from 'modules/application/stores/application.state';

@Component({
	templateUrl: './profile-selector.component.html',
	styleUrls: ['./profile-selector.component.scss']
})
export class ProfileSelectorComponent implements AfterViewInit {
	constructor(private readonly store: Store<ApplicationState>) {
		this.profilesToSelectFrom$ = this.store.pipe(select(getCurrentUserProfiles));
	}

	public ngAfterViewInit(): void {}

	public profilesToSelectFrom$: Observable<MetaGameProfile[]>;

	public selectProfile(selectedProfileId: string): void {
		this.store.dispatch(new SelectProfileSuccess({ selectedProfileId: selectedProfileId }));
	}
}
