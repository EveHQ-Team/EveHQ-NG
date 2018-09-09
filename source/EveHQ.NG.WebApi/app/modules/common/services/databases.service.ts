import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { mergeMap, every, catchError } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { ApiService } from 'modules/common/services/api.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';

@Injectable()
export class DatabasesService {
	constructor(
		private readonly api: ApiService,
		private readonly apiEndpointsService: ApiEndpointsService) { }

	public createDatabases(): Observable<boolean> {
		return from(this.requiredDatabases).pipe(
			mergeMap(databaseName => this.api.post(`${this.apiEndpointsService.databases}/${databaseName}/create`, {})),
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
