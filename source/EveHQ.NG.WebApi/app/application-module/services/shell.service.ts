import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ShellService {

	constructor() {
		this.headerChangedSubject = new Subject<string>();
		this.headerChanged = this.headerChangedSubject.asObservable();
	}

	public headerChanged: Observable<string>;

	public setHeader(value: string): void {
		this.headerChangedSubject.next(value);
	}

	private readonly headerChangedSubject: Subject<string>;
}
