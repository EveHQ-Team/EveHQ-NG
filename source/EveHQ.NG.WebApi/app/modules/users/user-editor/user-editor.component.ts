import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'modules/users/models/user'

@Component({
	selector: 'evehq-user-editor',
	templateUrl: './user-editor.component.html',
	styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

	@Input()
	public user: User;

	@Input()
	public isValid$: Observable<boolean>;

	public ngOnInit(): void {
		if (this.form.statusChanges !== null) {
			this.isValid$ = this.form.statusChanges.map((validityStatus: string) => validityStatus === 'VALID');
		}
	}

	@ViewChild('form')
	private form: NgForm;
}
