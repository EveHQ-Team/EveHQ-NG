import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ShellService } from 'modules/application/services/shell.service';
import { UserRepository } from 'modules/application/services/user.repository';
import { ApplicationUser } from 'modules/application/models/application-user';

@Component({
	selector: 'evehq-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements AfterViewInit {

	constructor(
		private readonly shellService: ShellService,
		private readonly userRepository: UserRepository) {
		this.formModel = this.createFormModel();
	}

	@Output()
	public userDataEntered = new EventEmitter<void>();

	public ngAfterViewInit(): void {
		this.shellService.setHeader('Create the user');
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
		this.userRepository.user = this.user;
		this.userDataEntered.emit();
	}

	private readonly user = new ApplicationUser;
	private readonly formModel: FormGroup;
}
