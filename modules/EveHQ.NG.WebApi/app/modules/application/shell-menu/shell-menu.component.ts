import { Component, OnInit } from '@angular/core';
import { ShellMenuCommand as MenuCommand } from 'modules/application/shell-menu/shell-menu-command';

@Component({
	selector: 'evehq-shell-menu',
	templateUrl: './shell-menu.component.html',
	styleUrls: ['./shell-menu.component.scss']
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
