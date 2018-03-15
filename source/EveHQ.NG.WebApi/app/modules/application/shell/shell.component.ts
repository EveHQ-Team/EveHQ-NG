import { Component, OnInit } from '@angular/core';
import * as shellActions from 'modules/application/stores/shell-actions.store';

@Component({
	selector: 'evehq-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

	public ngOnInit() {
		const a = new shellActions.SetShellHeader('JJJ');
	}

}
