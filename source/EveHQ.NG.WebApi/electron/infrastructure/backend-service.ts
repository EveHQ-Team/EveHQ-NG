import { app } from 'electron';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';
import { Subject, Observable } from 'rxjs';
import { ApplicationConfigurationHandler } from './application-configuration-handler';
import { InstallationChecker } from './installation-checker';
import { SystemErrorDescriber } from './system-error-describer';
import { LogBase } from './log-base';
import { SupportsInjection } from 'good-injector';
import * as findProcess from 'find-process';

@SupportsInjection
export class BackendService {
	constructor(
		private readonly applicationConfigurationHandler: ApplicationConfigurationHandler,
		private readonly installationChecker: InstallationChecker,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {
		this.platform = os.platform();
		this.validatePlatform();
	}

	public get isServiceStartedEvent(): Observable<boolean> {
		return this.isServiceStartedSubject.asObservable();
	}

	public async ensureStarted(isDevelopment: boolean): Promise<boolean> {
		return new Promise<boolean>(async (resolve, reject) => {
			await this.killExcessBackendServices();

			const command = `${this.buildPathToWebApi(isDevelopment)} ${`--urls=http://localhost:${await this.getPortNumber()}`}`;
			this.log.logInformation('Try to start the Backend-service.');
			this.log.logInformation(`Backend-service spawn command-line: ${command}`);
			this.apiServiceChildProcessId = exec(command).pid;

			let turn = 1;
			const numberOfTries = 40;
			const timeoutBetweenTurns = 500;
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
						reject(`An error occured during initial checking is Backend-service started: ${error}`);
					}

					if (turn > numberOfTries) {
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
		if (this.apiServiceChildProcessId === undefined) {
			return;
		}

		try {
			this.killProcess(this.apiServiceChildProcessId);
		}
		catch (error) {
			this.log.logError(`Can not stop the Backend-service process. ${this.systemErrorDescriber.describeError(error)}`);
		}
		finally {
			this.apiServiceChildProcessId = undefined;
		}
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
		return `publish//${this.getExecutableName()}`;
	}

	private getExecutableName(): string {
		let fileName = 'EveHQ.NG.WebApi';
		if (this.platform === 'win32') {
			fileName += '.exe';
		}

		return fileName;
	}

	private validatePlatform(): void {
		const supportedPlatforms = ['win32', 'linux', 'darwin'];
		if (supportedPlatforms.indexOf(this.platform) < 0) {
			throw new Error(`Unsupported platform: ${this.platform}.`);
		}
	}

	private async killExcessBackendServices(): Promise<void> {
		const foundbackendServices: Partial<{ pid: number, ppid: number }>[] = await findProcess('name', this.getExecutableName());
		if (foundbackendServices.length > 0) {
			this.log.logWarning(`Found ${foundbackendServices.length} previously started Backend-services. They will be killed.`);
		}

		foundbackendServices.forEach((backendService: Partial<{ pid: number, ppid: number }>) => this.killProcess(backendService.pid));
	}

	private killProcess(processId: number): void {
		this.log.logInformation(`Try to kill the Backend-service process with PID ${processId}.`);
		try {
			process.kill(processId);
		}
		catch (error) {
			this.log.logError(`Can not stop the Backend-service process. ${this.systemErrorDescriber.describeError(error)}`);
		}

		this.log.logInformation(`The Backend-service process with PID ${processId} killed successfully.`);
	}

	private apiServiceChildProcessId: number | undefined = undefined;
	private isServiceStartedSubject = new Subject<boolean>();
	private readonly platform: NodeJS.Platform;
}
