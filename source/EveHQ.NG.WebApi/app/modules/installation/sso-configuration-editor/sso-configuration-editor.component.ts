import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SsoConfiguration } from 'sso-configuration';
import {
	getSsoConfiguration,
	getSetSsoConfigurationError,
	SsoConfigurationState
	} from 'modules/application/stores/sso-configuration.state';
import {
	InstallCustomUrlSchema,
	getInstallCustomUrlSchemaError
	} from 'modules/application/use-cases/install-application.use-case';

@Component({
	selector: 'evehq-sso-configuration-editor',
	templateUrl: './sso-configuration-editor.component.html',
	styleUrls: ['./sso-configuration-editor.component.scss']
})
export class SsoConfigurationEditorComponent implements OnInit {
	constructor(private readonly store: Store<SsoConfigurationState>) {}

	public ssoConfiguration$: Observable<SsoConfiguration>;
	public setSsoConfigurationErrors$: Observable<any>;
	public isValid: boolean;

	public ngOnInit() {
		this.ssoConfiguration$ = this.store.pipe(select(getSsoConfiguration));
		this.setSsoConfigurationErrors$ = this.store.pipe(select(getSetSsoConfigurationError))
			.combineLatest(this.store.pipe(select(getInstallCustomUrlSchemaError)))
			.map((errors: string[]) => errors.join('\n').trim());
	}

	public changed(value: { ssoConfiguration: SsoConfiguration, isValid: boolean }): void {
		this.isValid = value.isValid;
		this.ssoConfiguration = value.ssoConfiguration;
	}

	public save(): void {
		this.store.dispatch(new InstallCustomUrlSchema(this.ssoConfiguration));
	}

	private ssoConfiguration: SsoConfiguration;
}