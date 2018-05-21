import { Component } from '@angular/core';
import {ApplicationState, getCurrentCharacterId } from 'modules/application/stores/application.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	templateUrl: './character-dashboard.component.html',
	styleUrls: ['./character-dashboard.component.scss']
})
export class CharacterDashboardComponent {
	constructor(private readonly store: Store<ApplicationState>) {
		this.characterId$ = this.store.pipe(select(getCurrentCharacterId));
	}

	public characterId$: Observable<string | undefined>;
}
