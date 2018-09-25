import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ApplicationConfiguration } from 'application-configuration';
import { getApplicationConfiguration, getSaveApplicationConfigurationError } from 'modules/application/stores/application.state';
import { ApplicationStore } from 'modules/application/stores/application.state';
import { GetherApplicationConfigurationSave } from 'modules/application/use-cases/gether-application-configuration.use-case';

@Component({
	templateUrl: './application-configuration-editor.component.html',
	styleUrls: ['./application-configuration-editor.component.scss']
})
export class ApplicationConfigurationEditorComponent implements OnInit {
	constructor(private readonly store: Store<ApplicationStore>) {}

	public applicationConfiguration$: Observable<ApplicationConfiguration>;
	public setApplicationConfigurationError$: Observable<any>;
	public isValid: boolean;

	public ngOnInit(): void {
		this.applicationConfiguration$ = this.store.pipe(select(getApplicationConfiguration));
		this.setApplicationConfigurationError$ = this.store.pipe(select(getSaveApplicationConfigurationError))
			.pipe(map(errors => Array.isArray(errors) ? errors.join('\n').trim() : (errors as string)));
	}

	public changed(value: { applicationConfiguration: ApplicationConfiguration, isValid: boolean }): void {
		this.isValid = value.isValid;
		this.applicationConfiguration = value.applicationConfiguration;
	}

	public save(): void {
		if (!this.isValid) {
			return;
		}

		this.store.dispatch(new GetherApplicationConfigurationSave(this.applicationConfiguration));
	}

	private applicationConfiguration: ApplicationConfiguration;
}
