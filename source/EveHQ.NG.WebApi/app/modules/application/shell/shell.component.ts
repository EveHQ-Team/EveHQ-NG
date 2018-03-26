import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'modules/application/stores/application-reducers.store';
import { InitializeApplication } from 'modules/application/stores/shell.actions';

@Component({
	selector: 'evehq-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
	constructor(private readonly store: Store<ApplicationState>) {
	}

	public ngOnInit() {
		this.store.dispatch(new InitializeApplication());
	}
}
