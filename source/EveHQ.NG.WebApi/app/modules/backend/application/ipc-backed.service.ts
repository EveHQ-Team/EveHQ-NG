import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { IpcResult } from 'ipc-result';

export abstract class IpcBackedServiceBase {
	protected getRequest<TResult>(channel: string): Observable<TResult> {
		const subject = new Subject<TResult>();
		ipcRenderer.once(channel, (event: any, result: IpcResult) => this.notifySubscribers(subject, result));
		ipcRenderer.send(channel);
		return subject.asObservable();
	}

	protected getAndNotifyOnChangeRequest<TResult>(channel: string): Observable<TResult> {
		const subject = new Subject<TResult>();
		ipcRenderer.on(channel, (event: any, result: IpcResult) => this.notifySubscribers(subject, result));
		ipcRenderer.send(channel);
		return subject.asObservable();
	}

	protected setRequest<TItem>(channel: string, item: TItem): Observable<void> {
		const subject = new Subject<void>();
		ipcRenderer.once(channel, (event: any, result: IpcResult) => this.notifySubscribers(subject, result));
		ipcRenderer.send(channel, item);
		return subject.asObservable();
	}

	protected notifySubscribers<TResult>(subject: Subject<TResult>, result: IpcResult): void {
		if (result.isSuccessful) {
			subject.next(result.result);
			subject.complete();
		}
		else {
			subject.error(result.error);
		}
	}
}
