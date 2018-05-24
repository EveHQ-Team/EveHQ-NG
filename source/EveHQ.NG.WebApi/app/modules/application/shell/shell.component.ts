import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationStore } from 'modules/application/stores/application.state';
import { InitializeApplication } from 'modules/application/use-cases/startup.use-case';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
	selector: 'evehq-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
	constructor(
		private readonly overlayContainer: OverlayContainer,
		private readonly store: Store<ApplicationStore>) {
	}

	public ngOnInit() {
		this.setDefaultTheme();
		this.store.dispatch(new InitializeApplication());
	}

	private setDefaultTheme(): void {
		const defaultThemeClass = 'dark-orange-theme';
		const themeClassSuffix = '-theme';
		const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
		const themeClassesToRemove = Array.from(overlayContainerClasses).filter(item => item.includes(themeClassSuffix));
		overlayContainerClasses.remove(...themeClassesToRemove);
		overlayContainerClasses.add(defaultThemeClass);
	}
}
