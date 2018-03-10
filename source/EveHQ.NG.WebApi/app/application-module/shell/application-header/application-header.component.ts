import { Component, OnDestroy } from '@angular/core';
import { ShellService } from 'application-module/services/shell.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'evehq-application-header',
	templateUrl: './application-header.component.html',
	styleUrls: ['./application-header.component.scss']
})
export class ApplicationHeaderComponent implements OnDestroy {

	constructor(
		private readonly shellService: ShellService) {
		this.headerChangedSubscription = shellService.headerChanged.subscribe(value => this.header = value);
	}

	public ngOnDestroy(): void {
		this.headerChangedSubscription.unsubscribe();
	}

	private header: string = 'EveHQ NG';
	private headerChangedSubscription: Subscription;

}
