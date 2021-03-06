import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ApplicationStore } from 'modules/application/stores/application.state';


@Component({
	selector: 'evehq-shell-header',
	templateUrl: './shell-header.component.html',
	styleUrls: ['./shell-header.component.scss']
})
export class ApplicationHeaderComponent {

	constructor(private readonly store: Store<ApplicationStore>) {
		//this.header$ = this.store.pipe(select(fromRoot.getHeader));
	}

	private header$: Observable<string>;

	private header: string = 'EveHQ NG';

}
