import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApplicationUser } from 'modules/application/models/application-user'

@Component({
	selector: 'evehq-user-editor',
	templateUrl: './user-editor.component.html',
	styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

	@Input()
	public user: ApplicationUser;

	@Input()
	public password: string;

	@Input()
	public isValid$: Observable<boolean>;

	public ngOnInit(): void {
		if (this.form.statusChanges !== null) {
			this.isValid$ = this.form.control.statusChanges.map((validityStatus: string) => validityStatus === 'VALID');
		}
	}

	@ViewChild('form')
	private form: NgForm;
}
