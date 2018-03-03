import { app, BrowserWindow, screen, net } from 'electron';
import * as path from 'path';
//const os = require('os');
import * as os from 'os';
import * as childProcess from 'child_process';
import { Subject, Observable } from 'rxjs';
import * as http from 'http';
const findProcess = require('find-process');

export class ApiService {
	constructor(private readonly isDevelopment: boolean) {
		this.platform = os.platform();
	}

	public get isServiceStartedEvent(): Observable<boolean> {
		return this.isServiceStartedSubject.asObservable();
	}

	public ensureStarted(): void {
		this.isServiceStarted().subscribe(
			(isStarted: boolean) => {
				if (isStarted) {
					console.log('The API-service already started.');
					this.isServiceStartedSubject.next(isStarted);
				}
				else {
					console.log('Try to start the API-service.');
					this.apiServiceChildProcess = childProcess.spawn(this.buildPathToWebApi());

					Observable.interval(2000).take(10).takeUntil(this.isServiceStartedEvent)
						.subscribe(_ => {
							this.isServiceStarted().subscribe(isStarted => {
								if (isStarted) {
									this.isServiceStartedSubject.next(isStarted);
								}
							});
						});
				}
			},
			error => console.error(`An error occured during initial checking is API-service started: ${error}`));
	}

	public stop() {
		if (!this.apiServiceChildProcess) {
			return;
		}

		this.apiServiceChildProcess.kill();
		this.apiServiceChildProcess = undefined;
	}

	private isServiceStarted(): Observable<boolean> {
		return Observable.fromPromise(findProcess('port', 5000))
			.map((processes: any[]) => !!processes.find((value: any) => value.cmd.indexOf('EveHQ.NG.WebApi') !== -1));
	}

	private buildPathToWebApi(): string {
		return this.isDevelopment ? this.getDevelopmentPath() : this.getProductionPath();
	}

	private getDevelopmentPath(): string {
		return path.join(app.getAppPath(), this.getExecutablePath());
	}

	private getProductionPath(): string {
		const appPath = app.getAppPath();
		const basePath = path.resolve(appPath, '..', '..', 'resources');
		const isAsar = !!appPath.match(/\.asar$/);
		const unpackedFolder = isAsar ? 'app.asar.unpacked' : 'app';
		return path.join(basePath, unpackedFolder, this.getExecutablePath());
	}

	private getExecutablePath(): string {
		switch (this.platform) {
			case 'win32':
				return 'publish//EveHQ.NG.WebApi.exe';
			case 'linux':
			case 'darwin':
				return 'publish//EveHQ.NG.WebApi';
			default:
				throw Error(`Unsupported platform: ${this.platform}.`);
		}
	}

	private apiServiceChildProcess: childProcess.ChildProcess;
	private readonly platform: NodeJS.Platform;
	private isServiceStartedSubject = new Subject<boolean>();
}
