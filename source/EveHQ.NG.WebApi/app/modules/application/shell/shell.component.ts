import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'modules/application/application.state';
import { InitializeApplication } from 'modules/application/use-cases/startup.use-case';

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
