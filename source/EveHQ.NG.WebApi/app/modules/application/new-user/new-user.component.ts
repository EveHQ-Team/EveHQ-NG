import { Component, AfterViewInit } from '@angular/core';
import { ShellService } from 'modules/application/services/shell.service';

@Component({
	selector: 'evehq-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements AfterViewInit {

	constructor(private readonly shellService: ShellService) {
	}

	public ngAfterViewInit(): void {
		this.shellService.setHeader('Create the user');
	}
}
