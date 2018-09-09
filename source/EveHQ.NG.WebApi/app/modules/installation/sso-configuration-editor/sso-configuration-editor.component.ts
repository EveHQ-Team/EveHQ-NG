import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SsoConfiguration } from 'sso-configuration';
// import { combineLatest } from 'rxjs/observable/combineLatest'
import { map } from 'rxjs/operators'
import {ApplicationStore, getSsoConfiguration, getSaveSsoConfigurationError } from 'modules/application/stores/application.state';
import {SaveSsoConfiguration} from 'modules/application/stores/configuration.state';

@Component({
	selector: 'evehq-sso-configuration-editor',
	templateUrl: './sso-configuration-editor.component.html',
	styleUrls: ['./sso-configuration-editor.component.scss']
})
export class SsoConfigurationEditorComponent implements OnInit {
	constructor(private readonly store: Store<ApplicationStore>) {}

	public ssoConfiguration$: Observable<SsoConfiguration>;
	public setSsoConfigurationErrors$: Observable<any>;
	public isValid: boolean;

	public ngOnInit() {
		this.ssoConfiguration$ = this.store.pipe(select(getSsoConfiguration));
		this.setSsoConfigurationErrors$ = this.store.pipe(select(getSaveSsoConfigurationError))
			.pipe(map(errors => Array.isArray(errors) ? errors.join('\n').trim() : (errors as string)));
	}

	public changed(value: { ssoConfiguration: SsoConfiguration, isValid: boolean }): void {
		this.isValid = value.isValid;
		this.ssoConfiguration = value.ssoConfiguration;
	}

	public save(): void {
		this.store.dispatch(new SaveSsoConfiguration(this.ssoConfiguration));
	}

	private ssoConfiguration: SsoConfiguration;
}
