import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ApplicationStore } from 'modules/application/stores/application.state';
import { RequiredDatabase } from 'modules/application/models/required-database.model';
import { getRequiredDatabases, getErrors } from 'modules/application/use-cases/create-required-databases.use-case';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateRequiredDatabasesSuccess } from 'modules/application/use-cases/create-required-databases.use-case';

@Component({
	selector: 'evehq-required-databases-page',
	templateUrl: './required-databases-page.component.html',
	styleUrls: ['./required-databases-page.component.scss']
})
export class RequiredDatabasesPageComponent implements OnInit {
	constructor(private readonly store: Store<ApplicationStore>) {}

	public databases$: Observable<RequiredDatabase[]>;

	public haveAllDatabasesCreated$: Observable<boolean>;

	public errors$: Observable<string[]>;

	public ngOnInit(): void {
		this.databases$ = this.store.pipe(select(getRequiredDatabases));
		this.haveAllDatabasesCreated$ = this.databases$.pipe(
			map(databases => databases.every(database => database.isCreated)));
		this.errors$ = this.store.pipe(select(getErrors));
	}

	public configureAuthentication(): void {
		this.store.dispatch(new CreateRequiredDatabasesSuccess());
	}
}
