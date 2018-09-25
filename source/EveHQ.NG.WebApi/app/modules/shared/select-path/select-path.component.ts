import { Component, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
	selector: 'evehq-select-path',
	templateUrl: './select-path.component.html',
	styleUrls: ['./select-path.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectPathComponent),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => SelectPathComponent),
			multi: true
		}
	]
})
export class SelectPathComponent implements ControlValueAccessor {
	@Input()
	public path: string = '';

	@Input()
	public doSelectFolder: boolean = false;

	@Input()
	public openSelectPathDialogButtonLabel: string = 'Select';

	@Input()
	public isRequired: boolean = true;

	public writeValue(value: string): void {
		if (value == undefined) {
			return;
		}

		this.path = value;
	}

	public registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	public registerOnTouched(fn: any): void {}

	public validate(control: FormControl): any {
		return this.isRequired && !this.path
					? {
						requiredError: { given: control.value }
					}
					: undefined;
	}

	private openSelectPathDialog(): void {
		this.systemOpenDialogButton.nativeElement.click();
	}

	private onPathSelected(): void {
		this.path = this.systemOpenDialogButton.nativeElement.files[0].path;
		this.propagateChange(this.path);
	}

	@ViewChild('systemOpenDialogButton')
	private systemOpenDialogButton: ElementRef;

	private propagateChange = (_: string) => {};
}
