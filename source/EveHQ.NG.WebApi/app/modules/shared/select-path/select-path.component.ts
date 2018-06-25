import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'evehq-select-path',
	templateUrl: './select-path.component.html',
	styleUrls: ['./select-path.component.scss']
})
export class SelectPathComponent {
	@Input()
	public path: string = '';

	@Input()
	public doSelectFolder: boolean = false;

	@Input()
	public fieldLabel: string = 'Select path:';

	@Input()
	public openSelectPathDialogButtonLabel: string = 'Select';

	@Input()
	public error: string = '';

	@Output()
	public pathSelected = new EventEmitter<string>();

	private openSelectPathDialog(): void {
		this.systemOpenDialogButton.nativeElement.click();
	}

	private onPathSelected(): void {
		console.warn('###: ', this.systemOpenDialogButton.nativeElement.files[0].path);
		this.path = this.systemOpenDialogButton.nativeElement.files[0].path;
		//console.warn('###: ', this.systemOpenDialogButton.nativeElement.files.map((item: File) => item.name).join('; '));
	}

	@ViewChild('systemOpenDialogButton')
	private systemOpenDialogButton: ElementRef;
}
