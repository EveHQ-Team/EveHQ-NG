import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'modules/application/application.state'


@Component({
	selector: 'evehq-shell-header',
	templateUrl: './shell-header.component.html',
	styleUrls: ['./shell-header.component.scss']
})
export class ApplicationHeaderComponent {

	constructor(private readonly store: Store<fromRoot.ApplicationState>) {
		this.header$ = this.store.pipe(select(fromRoot.getHeader));
	}

	private header$: Observable<string>;

	private header: string = 'EveHQ NG';

}
