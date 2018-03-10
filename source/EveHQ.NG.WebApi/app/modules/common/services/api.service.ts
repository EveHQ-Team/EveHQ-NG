import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class ApiService {
	constructor(private readonly http: HttpClient) {
	}

	public get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
		return this.http.get(url, { params });
	}

	public post(url: string, body: Object = {}): Observable<any> {
		return this.http.post(url, JSON.stringify(body), { headers: this.headers });
	}

	public put(url: string, body: Object = {}): Observable<any> {
		return this.http.put(url, JSON.stringify(body), { headers: this.headers });
	}

	public delete(url: string): Observable<any> {
		return this.http.delete(url, { headers: this.headers });
	}

	private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' });
}
