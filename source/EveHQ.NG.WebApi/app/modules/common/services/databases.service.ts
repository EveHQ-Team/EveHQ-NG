import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { ApiService } from 'modules/common/services/api.service';
import { ApiEndpointsService } from 'modules/common/services/api-endpoints.service';
import { ApiException } from 'modules/application/models/api-exception';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DatabasesService {
	constructor(
		private readonly api: ApiService,
		private readonly apiEndpointsService: ApiEndpointsService) {}

	public createDatabase(databaseName: string): Observable<void> {
		return this.api.post(`${this.apiEndpointsService.databases}/${databaseName}/create`, {}).pipe(
			map(response => response.status === 201
							? of<void>()
							: _throw(new Error(`Can not create database ${databaseName}: ${response.body}`))),
			catchError(error => _throw(ApiException.fromHttpErrorResponse(error, `Can not create database ${databaseName}.`))));
	}
}
