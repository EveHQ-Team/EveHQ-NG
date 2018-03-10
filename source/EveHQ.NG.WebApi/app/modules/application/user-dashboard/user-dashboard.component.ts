import { Component, AfterViewInit } from '@angular/core';
import { ShellService } from 'modules/application/services/shell.service';

@Component({
	selector: 'evehq-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements AfterViewInit {

	constructor(private readonly shellService: ShellService) {
	}

	public ngAfterViewInit(): void {
		this.shellService.setHeader('User dashboard');
	}
}
