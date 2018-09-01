import { app } from 'electron';
import * as path from 'path';
import * as os from 'os';
import * as findProcess from 'find-process';
import { spawn } from 'child_process';
import { Subject, Observable } from 'rxjs';
import { InstallationChecker } from './installation-checker';
import { SystemErrorDescriber } from './system-error-describer';
import { LogBase } from './log-base';
import { SupportsInjection } from 'good-injector';
import { ApplicationConfigurationHolder } from './application-configuration-holder';
import { IsAliveService } from '../backend/is-alive.service';

@SupportsInjection
export class BackendService {
	constructor(
		private readonly applicationConfigurationHolder: ApplicationConfigurationHolder,
		private readonly installationChecker: InstallationChecker,
		private readonly isAliveService: IsAliveService,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {
		this.validatePlatform(os.platform());
		this.platform = os.platform();
		this.applicationConfigurationHolder.on('changed', () => this.restart());
	}

	public get isServiceStartedEvent(): Observable<boolean> {
		return this.isServiceStartedSubject.asObservable();
	}

	public isDevelopment: boolean;

	public async start(): Promise<void> {
		this.log.info('Starting Backend-service.');
		await this.getPortNumber().then(portNumber => {
				this.ensureStarted(portNumber)
					? this.log.info(`Backend-service started on port ${portNumber}.`)
					: this.log.error(`Backend-service can not be started on port ${portNumber}.`);
			})
			.catch(error => this.log.error(`Can not start the Backend-service. The error was: ${error}.`));
	}

	public stop(): void {
		this.log.info('Backend-service will be stoped.');

		if (this.apiServiceChildProcessId === undefined) {
			this.log.info('No Backend-service have been found.');
			return;
		}

		try {
			this.log.info('Started to kill Backend-service process.');
			this.killProcess(this.apiServiceChildProcessId);
			this.log.info('Finished to kill Backend-service process.');
		}
		catch (error) {
			this.log.error(`Can not stop the Backend-service process. ${this.systemErrorDescriber.describeError(error)}`);
		}
		finally {
			this.apiServiceChildProcessId = undefined;
		}
	}

	public async restart(): Promise<void> {
		this.log.info('Going to restart Backend-service.');
		this.stop();
		await this.start();
		this.log.info('Backend-service is restarted.');
	}

	private async ensureStarted(portNumber: number): Promise<boolean> {
		return new Promise<boolean>(async (resolve, reject) => {
			await this.killExcessBackendServices();

			const command = `${this.buildPathToWebApi(this.isDevelopment)} ${`--urls=http://localhost:${portNumber}`}`;
			this.log.info('Try to start the Backend-service.');
			this.log.info(`Backend-service spawn command-line: ${command}`);
			this.apiServiceChildProcessId = spawn(
				`${this.buildPathToWebApi(this.isDevelopment)}`,
				[`--urls=http://localhost:${portNumber}`]).pid;

			let turn = 1;
			const numberOfTries = 10;
			const timeoutBetweenTurns = 1000;
			const checkInterval = setInterval(
				() => {
					this.log.info(`Checking is Backend-service alive. Turn ${turn} of ${numberOfTries}.`);
					this.isAliveService.isBackendServiceAlive()
						.then(isAlive => {
							if (isAlive) {
								this.log.info('Backend-service is alive.');
								clearInterval(checkInterval);
								resolve(true);
							}

							if (turn > numberOfTries) {
								this.log.info('Number of tries exceeded.');
								clearInterval(checkInterval);
								resolve(false);
							}
							else {
								this.log.info('Going to wait before the next try.');
								turn++;
							}
						})
						.catch(error => {
							clearInterval(checkInterval);
							reject(`An error occured during initial checking is Backend-service started: ${error}`);
						});
				},
				timeoutBetweenTurns);
		});
	}

	private async getPortNumber(): Promise<number> {
		return new Promise<number>(async (resolve, reject) => {
			this.applicationConfigurationHolder.getApplicationConfiguration()
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

	private validatePlatform(platform: string): void {
		const supportedPlatforms = ['win32', 'linux', 'darwin'];
		if (supportedPlatforms.indexOf(platform) < 0) {
			throw new Error(`Unsupported platform: ${platform}.`);
		}
	}

	private async killExcessBackendServices(): Promise<void> {
		const foundbackendServices: Partial<{ pid: number, ppid: number }>[] = await findProcess('name', this.getExecutableName());
		if (foundbackendServices.length > 0) {
			this.log.warning(`Found ${foundbackendServices.length} previously started Backend-services. They will be killed.`);
		}

		foundbackendServices.forEach((backendService: Partial<{ pid: number, ppid: number }>) => this.killProcess(backendService.pid));
	}

	private killProcess(processId: number): void {
		this.log.info(`Try to kill the Backend-service process with PID ${processId}.`);
		try {
			process.kill(processId);
		}
		catch (error) {
			this.log.error(`Can not stop the Backend-service process. ${this.systemErrorDescriber.describeError(error)}`);
		}

		this.log.info(`The Backend-service process with PID ${processId} killed successfully.`);
	}

	private apiServiceChildProcessId: number | undefined = undefined;
	private isServiceStartedSubject = new Subject<boolean>();
	private readonly platform: NodeJS.Platform;
}
