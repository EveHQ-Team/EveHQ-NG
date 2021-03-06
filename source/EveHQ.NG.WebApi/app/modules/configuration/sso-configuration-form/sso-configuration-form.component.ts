import { Component, Input, Output, OnChanges, OnDestroy, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SsoConfiguration } from 'sso-configuration';

@Component({
	selector: 'evehq-sso-configuration-form',
	templateUrl: './sso-configuration-form.component.html',
	styleUrls: ['./sso-configuration-form.component.scss']
})
export class SsoConfigurationFormComponent implements OnChanges, OnDestroy {
	constructor() {
		this.buildForm();
	}

	// TODO: Disable all controls if chosen the default configuration.
	@Input()
	public ssoConfiguration: SsoConfiguration;

	@Output()
	public changed = new EventEmitter<{ ssoConfiguration: SsoConfiguration, isValid: boolean }>();

	public formGroup: FormGroup;

	private clientIdErrors: string;
	private clientSecretErrors: string;
	private callbackUrlErrors: string;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['ssoConfiguration'] && changes['ssoConfiguration'].currentValue) {
			this.formGroup.patchValue(this.ssoConfiguration);
			this.buildErrorMessages();
		}
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	public openDevelopersSite(): void {
		// TODO: Open https://developers.eveonline.com/applications in the default browser.
	}

	private buildForm(): void {
		this.clientId = new FormControl('', Validators.required);
		this.clientSecret = new FormControl('', Validators.required);
		this.callbackUrl = new FormControl('', Validators.required);
		this.formGroup = new FormGroup({
			clientId: this.clientId,
			clientSecret: this.clientSecret,
			callbackUrl: this.callbackUrl
		});

		this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$))
			.subscribe((value: SsoConfiguration) => {
				this.buildErrorMessages();
				this.changed.emit({
					ssoConfiguration: value,
					isValid: this.formGroup.valid
				});
			});
	}

	private buildErrorMessages(): void {
		this.clientIdErrors = '';
		this.clientSecretErrors = '';
		this.callbackUrlErrors = '';

		if (this.clientId.errors) {
			this.clientIdErrors = this.clientId.errors['required'] ? 'Specify the Client ID.' : '';
		}

		if (this.clientSecret.errors) {
			this.clientSecretErrors = this.clientSecret.errors['required'] ? 'Specify the Client secret.' : '';
		}

		if (this.callbackUrl.errors) {
			this.callbackUrlErrors = this.callbackUrl.errors['required'] ? 'Specify the Custom URL-schema.' : '';
		}


	}

	private clientId: FormControl;
	private clientSecret: FormControl;
	private callbackUrl: FormControl;
	private destroyed$ = new Subject<void>();
}
