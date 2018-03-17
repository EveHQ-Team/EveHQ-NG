import { Component, OnInit } from '@angular/core';
import { SetShellHeader } from 'modules/application/stores/shell.actions';

@Component({
	selector: 'evehq-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

	public ngOnInit() {
		const a = new SetShellHeader('JJJ');
	}
}
