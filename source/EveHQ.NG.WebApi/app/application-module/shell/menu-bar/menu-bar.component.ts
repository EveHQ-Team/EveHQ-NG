import { Component, OnInit } from '@angular/core';
import { MenuCommand } from './menu-command';

@Component({
	selector: 'evehq-menu-bar',
	templateUrl: './menu-bar.component.html',
	styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

	constructor() {
	}

	public ngOnInit() {
	}

	private get commands(): MenuCommand[] {
		return [{ title: '1111' }];
	}
}
