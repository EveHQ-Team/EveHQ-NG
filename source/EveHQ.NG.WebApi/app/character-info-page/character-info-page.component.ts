import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { CurrentCharacterService } from 'services/current-character.service';
import { ApiService } from 'services/api.service';
import { CharacterInfo } from 'models/character-info';
import { SkillQueueItem } from 'models/skill-queue-item';
import { LogService } from 'services/log.service';
import { ApiEndpointsService } from 'services/api-endpoints.service';

@Component({
	selector: 'app-character-info-page',
	templateUrl: './character-info-page.component.html',
	styleUrls: ['./character-info-page.component.scss']
})
export class CharacterInfoPageComponent implements OnDestroy {
	constructor(
		private readonly api: ApiService,
		private readonly currentCharacterService: CurrentCharacterService,
		private readonly router: Router,
		private readonly endpoints: ApiEndpointsService,
		private readonly log: LogService) {
		this.setCurrentAndGoToLoginIfNotItNotPresent();

		this.loggedInCharacterListChangedSubscription =
			this.currentCharacterService.loggedInCharacterListChanged.subscribe(
				(characters: CharacterInfo[]) => {
					this.setCurrentAndGoToLoginIfNotItNotPresent();
				},
				error => this.log.error('An error occured during applying of changing the current character.', error),
				() => this.log.info('Changing of the current character applied.'));
	}

	public ngOnDestroy(): void {
		this.loggedInCharacterListChangedSubscription.unsubscribe();
	}

	private skills: SkillQueueItem[] = [];

	private setCurrentAndGoToLoginIfNotItNotPresent(): void {
		this.currentCharacter = this.currentCharacterService.currentCharacter;
		if (!this.currentCharacter) {
			this.navigateToLoginPage();
			return;
		}

		const id = ((this.currentCharacter) as CharacterInfo).id;
		this.currentCharacterService.getSkillQueue(id).subscribe((skillQueueItems: SkillQueueItem[]) => {
			return this.skills = skillQueueItems;
		});
	}

	private logout(): void {
		if (!this.currentCharacter) {
			return;
		}

		this.log.info(`Requesting log out for character ${this.currentCharacter.name} with ID ${this.currentCharacter.id}.`);
		this.api.post(`http://localhost:5000/api/authentication/${this.currentCharacter.id}/logout/`)
			.subscribe(() => {
					this.log.info('Character logged out. Navigating to login page.');
					return this.navigateToLoginPage();
				},
				error => this.log.error('An error occured during logging out character.', error));
	}

	private testSettings(): void {
		const settings = {
			applicationDataFolder: `${Math.random().toString()}`,
			temporaryDataFolder: `${Date.now().toString()}`,
		};
		this.api.post(`${this.endpoints.settings}/folders`, settings).subscribe();
	}

	private navigateToLoginPage(): void {
		this.router.navigate(['/login']);
	}

	private portraitUri: string;
	private currentCharacter: CharacterInfo | undefined;
	private readonly loggedInCharacterListChangedSubscription: Subscription;
}
