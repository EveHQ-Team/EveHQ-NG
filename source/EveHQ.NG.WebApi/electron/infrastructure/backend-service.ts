import { app } from 'electron';
import * as path from 'path';
import * as os from 'os';
import * as childProcess from 'child_process';
import { Subject, Observable } from 'rxjs';
import {ApplicationConfigurationHandler} from './application-configuration-handler';
import { InstallationChecker } from './installation-checker';
const findProcess = require('find-process'); // TODO: Remove package.
import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class BackendService {
	constructor(
		//private readonly isDevelopment: boolean,
		private readonly applicationConfigurationHandler: ApplicationConfigurationHandler,
		private readonly installationChecker: InstallationChecker) {
		this.platform = os.platform();
	}

	public get isServiceStartedEvent(): Observable<boolean> {
		return this.isServiceStartedSubject.asObservable();
	}

	public async ensureStarted(isDevelopment: boolean): Promise<boolean> {
		if (await this.installationChecker.isApplicationInstalled()) {
			console.log('The Backend-service already started.');
			return Promise.resolve(true);
		}

		return new Promise<boolean>(async (resolve, reject) => {
			const command = `${this.buildPathToWebApi(isDevelopment)} ${`--urls=http://localhost:${await this.getPortNumber()}`}`;
			console.log('Try to start the API-service.');
			console.log(`Backend-service spawn command-line: ${command}`);
			this.apiServiceChildProcess = childProcess.exec(command);

			let turn = 1;
			const timeoutBetweenTurns = 2000;
			const checkInterval = setInterval(
				async () => {
					try {
						if (await this.installationChecker.isApplicationInstalled()) {
							clearInterval(checkInterval);
							resolve(true);
						}
					}
					catch (error) {
						clearInterval(checkInterval);
						reject(`An error occured during initial checking is API-service started: ${error}`);
					}

					if (turn > 10) {
						clearInterval(checkInterval);
						resolve(false);
					}
					else {
						turn++;
					}
				},
				timeoutBetweenTurns);
		});
	}

	public stop() {
		// TODO: Kill process even if it's started by the prior instance of the Electron application.
		if (!this.apiServiceChildProcess) {
			return;
		}

		this.apiServiceChildProcess.kill();
		this.apiServiceChildProcess = undefined;
	}

	private async getPortNumber(): Promise<number> {
		return new Promise<number>(async (resolve, reject) => {
			this.applicationConfigurationHandler.readApplicationConfiguration()
				.then(applicationConfiguration => resolve(applicationConfiguration.backendServicePortNumber))
				.catch(error => reject(error));
		});
	}

	private buildPathToWebApi(isDevelopment: boolean): string {
		return isDevelopment ? this.getDevelopmentPath() : this.getProductionPath();
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
