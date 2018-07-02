import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
	InstallApplicationUseCaseStore,
	getApplicationConfiguration,
	getSetApplicationConfigurationError,
	SetApplicationConfiguration
	} from 'modules/application/use-cases/install-application.use-case';
import { Observable } from 'rxjs/Observable';
import { ApplicationConfiguration } from 'application-configuration';

@Component({
	templateUrl: './application-configuration-editor.component.html',
	styleUrls: ['./application-configuration-editor.component.scss']
})
export class ApplicationConfigurationEditorComponent implements OnInit {

	constructor(private readonly store: Store<InstallApplicationUseCaseStore>) {}

	public applicationConfiguration$: Observable<ApplicationConfiguration>;
	public setApplicationConfigurationError$: Observable<any>;
	public isValid: boolean;

	public ngOnInit(): void {
		this.applicationConfiguration$ = this.store.pipe(select(getApplicationConfiguration));
		this.setApplicationConfigurationError$ = this.store.pipe(select(getSetApplicationConfigurationError));
	}

	public changed(value: { applicationConfiguration: ApplicationConfiguration, isValid: boolean }): void {
		console.warn('changed editor: ', value);
		this.isValid = value.isValid;
		this.applicationConfiguration = value.applicationConfiguration;
	}

	public save(): void {
		if (!this.isValid) {
			return;
		}

		this.store.dispatch(new SetApplicationConfiguration({ applicationConfiguration: this.applicationConfiguration }));
	}

	private applicationConfiguration: ApplicationConfiguration;
}
