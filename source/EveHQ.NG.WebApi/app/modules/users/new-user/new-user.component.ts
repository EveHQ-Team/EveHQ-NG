import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SetShellHeader } from 'modules/application/stores/shell.actions';
import * as fromRoot from 'modules/application/stores/application-reducers.store'
import { Store } from '@ngrx/store';

@Component({
	selector: 'evehq-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements AfterViewInit {

	constructor(
		private readonly store: Store<fromRoot.ApplicationState>) {
		this.formModel = this.createFormModel();
	}

	@Output()
	public userDataEntered = new EventEmitter<void>();

	public ngAfterViewInit(): void {
		this.store.dispatch(new SetShellHeader('Create the user'));
	}

	private createFormModel(): FormGroup {
		const formModel = new FormGroup({
			name: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
			password: new FormControl(''),
			isLoginRequired: new FormControl(true)
		});

		return formModel;
	}

	private createUser(): void {
		this.userDataEntered.emit();
	}

	private readonly formModel: FormGroup;
}
