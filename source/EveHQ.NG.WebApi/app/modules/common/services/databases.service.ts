import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { mergeMap, every } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { ApiService } from 'modules/common/services/api.service';

@Injectable()
export class DatabasesService {
	constructor(private readonly api: ApiService) {}

	public createDatabases(): Observable<boolean> {
		return from(this.requiredDatabases).pipe(
			mergeMap(database => this.api.post('databases/create', { database: database })),
			every(response => response.status === 201)
		);
	}

	private readonly applicationDatabaseName = 'evehq-ng';
	private readonly sdeDatabaseName = 'sde';
	private readonly requiredDatabases = [
		this.applicationDatabaseName,
		this.sdeDatabaseName
	];
}
