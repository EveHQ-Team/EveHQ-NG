import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { InstallApplicationUseCaseStore, getSetApplicationConfigurationError } from
	'modules/application/use-cases/install-application.use-case';
import { Observable } from 'rxjs/Observable';

@Component({
	templateUrl: './application-configuration-editor.component.html',
	styleUrls: ['./application-configuration-editor.component.scss']
})
export class ApplicationConfigurationEditorComponent {
	constructor(private readonly store: Store<InstallApplicationUseCaseStore>) {
		this.dataFolerError$ = this.store.pipe(select(getSetApplicationConfigurationError));
		this.dataFolderPath$ = new Observable<string>();
	}

	public dataFolderPath$: Observable<string>;
	public dataFolerError$: Observable<any>;
}
