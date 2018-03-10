import { Component, AfterViewInit } from '@angular/core';
import { ShellService } from 'modules/application/services/shell.service';

@Component({
	selector: 'evehq-meta-game-profile-selector',
	templateUrl: './meta-game-profile-selector.component.html',
	styleUrls: ['./meta-game-profile-selector.component.scss']
})
export class MetaGameProfileSelectorComponent implements AfterViewInit {

	constructor(private readonly shellService: ShellService) {
	}

	public ngAfterViewInit(): void {
		this.shellService.setHeader('Select mata-game profile');
	}
}
