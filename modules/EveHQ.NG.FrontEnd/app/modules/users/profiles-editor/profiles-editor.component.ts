import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MetaGameProfile } from 'modules/application/models/meta-game-profile'

@Component({
	selector: 'evehq-profiles-editor',
	templateUrl: './profiles-editor.component.html',
	styleUrls: ['./profiles-editor.component.scss']
})
export class ProfilesEditorComponent implements OnInit {

	@Input()
	public profiles: MetaGameProfile[];

	@Output('addProfile')
	public addProfileEvent = new EventEmitter<string>();

	@Output('removeProfile')
	public removeProfileEvent = new EventEmitter<string>();

	public ngOnInit(): void {
		if (this.profileNameForm.statusChanges !== null) {
			this.isProfileNameValid$ = this.profileNameForm.control.statusChanges.map(
				(validityStatus: string) => validityStatus === 'VALID');
		}
	}

	private addProfile(profileName: string): void {
		this.addProfileEvent.emit(profileName);
		this.profileName = '';
		this.profileNameForm.control.markAsPristine();
	}

	private removeProfile(profileId: string): void {
		this.removeProfileEvent.emit(profileId);
	}

	private get isRemoveEnabled(): boolean {
		return this.profiles.length > 1;
	}

	private profileName: string = '';
	private isProfileNameValid$: Observable<boolean>;

	@ViewChild('profileNameForm')
	private profileNameForm: NgForm;
}
