import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { shell } from 'electron';
import { Subscription } from 'rxjs/Rx';
import { ApiService } from 'services/api.service';
import { CharacterInfo } from 'models/character-info';
import { CurrentCharacterService } from 'services/current-character.service';

declare var electron: any;

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {

	constructor(
		private readonly api: ApiService,
		private readonly currentCharacterService: CurrentCharacterService,
		private readonly router: Router) {
		this.loggedInCharacterListChangedSubscription =
			this.currentCharacterService.loggedInCharacterListChanged.subscribe(
				(characters: CharacterInfo[]) => {
					if (this.currentCharacterService.currentCharacter) {
						this.router.navigate(['/character-info']);
						return;
					}
				},
				error => console.error(`LLLL: ${error}`),
				() => console.info('LLLL Complited.'));
	}

	public ngOnDestroy(): void {
		this.loggedInCharacterListChangedSubscription.unsubscribe();
	}

	private login(): void {
		this.api.get('http://localhost:5000/api/authentication/getAuthenticationUri')
			.subscribe(authenticationUri => {
				shell.openExternal(authenticationUri);
			});
	}

	private readonly loggedInCharacterListChangedSubscription: Subscription;
}
