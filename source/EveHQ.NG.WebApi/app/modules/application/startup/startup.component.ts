import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentHostDirective } from 'modules/application/services/component-host.directive';
import { StartupContext } from 'modules/application/startup/startup.context';

@Component({
	selector: 'evehq-application-startup',
	templateUrl: './startup.component.html',
	styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

	constructor(
		private readonly startupContext: StartupContext) {
	}

	public ngOnInit() {
		this.startupContext.initialize(this.componentHost);
		this.startupContext.start();
	}

	@ViewChild(ComponentHostDirective)
	public componentHost: ComponentHostDirective;
}
