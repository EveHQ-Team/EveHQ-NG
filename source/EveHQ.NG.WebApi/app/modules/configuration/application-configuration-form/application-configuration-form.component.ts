import { Component, Input, Output, OnChanges, OnDestroy, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApplicationConfiguration } from 'application-configuration';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
	selector: 'evehq-application-configuration-form',
	templateUrl: './application-configuration-form.component.html',
	styleUrls: ['./application-configuration-form.component.scss']
})
export class ApplicationConfigurationFormComponent implements OnChanges, OnDestroy {

	constructor() {
		this.buildForm();
	}

	@Input()
	public applicationConfiguration: ApplicationConfiguration;

	@Output()
	public changed = new EventEmitter<{ applicationConfiguration: ApplicationConfiguration, isValid: boolean }>();

	public formGroup: FormGroup;

	public dataFolderPathErrors: string = '';

	public backendServicePortNumberErrors: string = '';

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['applicationConfiguration'] && changes['applicationConfiguration'].currentValue) {
			this.formGroup.patchValue(this.applicationConfiguration);
			this.buildErrorMessages();
		}
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private buildForm(): void {
		this.dataFolderPathControl = new FormControl('', Validators.required);
		this.backendServicePortNumberControl = new FormControl(1, [Validators.required, Validators.min(1), Validators.max(65535)]);
		this.formGroup = new FormGroup({
			dataFolderPath: this.dataFolderPathControl,
			backendServicePortNumber: this.backendServicePortNumberControl
		});

		this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$))
			.subscribe((value: ApplicationConfiguration) => {
				this.buildErrorMessages();
				this.changed.emit({
					applicationConfiguration: value,
					isValid: this.formGroup.valid
				});
			});
	}

	private buildErrorMessages(): void {
		if (this.dataFolderPathControl.errors) {
			this.dataFolderPathErrors = this.dataFolderPathControl.errors['required'] ? 'Specify the data folder path.' : '';
		}
		else {
			this.dataFolderPathErrors = '';
		}

		if (this.backendServicePortNumberControl.errors) {
			const backendServicePortNumberErrors: string[] = [];
			if (this.backendServicePortNumberControl.errors['required']) {
				backendServicePortNumberErrors.push('Specify the port number.');
			}

			if (this.backendServicePortNumberControl.errors['min'] || this.backendServicePortNumberControl.errors['max']) {
				backendServicePortNumberErrors.push('The port number should be between 1 and 65535.');
			}

			this.backendServicePortNumberErrors = backendServicePortNumberErrors.join('/n');
		}
		else {
			this.backendServicePortNumberErrors = '';
		}
	}

	private dataFolderPathControl: FormControl;
	private backendServicePortNumberControl: FormControl;
	private destroyed$ = new Subject<void>();
}
