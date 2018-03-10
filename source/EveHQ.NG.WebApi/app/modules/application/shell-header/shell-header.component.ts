import { Component, OnDestroy } from '@angular/core';
import { ShellService } from 'modules/application/services/shell.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'evehq-shell-header',
	templateUrl: './shell-header.component.html',
	styleUrls: ['./shell-header.component.scss']
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
