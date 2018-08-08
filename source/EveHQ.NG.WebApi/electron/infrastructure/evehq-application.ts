import * as path from 'path';
import { app, net } from 'electron';
import { ContainerBuilder } from './container-builder';
import { Container } from 'good-injector';
import { BackendService } from './backend-service';
import { InstallationService } from './installation.service';
import { SplashWindow } from './splash-window';
import { LogBase } from './log-base';
import { MainWindow } from './main-window';
import { ApplicationConfigurationHandler } from './application-configuration-handler';

export class EveHqApplication {
	constructor(private readonly isDevelopment: boolean) {
		this.containerBuilder = new ContainerBuilder();
		this.contentFolder = path.resolve(__dirname, '..');
		this.log = this.container.resolve(LogBase);
	}

	public start(): void {
		this.ensureSingleInstance();
		this.registerEventHandlers();
	}

	public stop(): void {
		this.mainWindow.close();;
	}

	private get container(): Container {
		return this.containerBuilder.container;
	}

	private ensureSingleInstance(): void {
		const isSecondInstance = app.makeSingleInstance(
			(otherInstanceArguments: string[]) => {
				if (this.mainWindow.isOpen) {
					this.log.logInformation('Another instance of the application already started.');
					this.mainWindow.restoreIfMinimized();
					this.authenticateWithCode(otherInstanceArguments);
				}
			});

		if (isSecondInstance) {
			app.exit();
		}
	}

	private registerEventHandlers(): void {
		app.on('ready', () => this.onReady());
		app.on('window-all-closed', () => this.onWindowAllClosed());
		app.on('activate', () => this.onActivate());
		app.on('open-url', () => this.onOpenUrl());
	}

	private async onReady(): Promise<void> {
		this.createInstallationService();
		const applicationConfigurationHandler = this.container.resolve(ApplicationConfigurationHandler);
		this.backendService = this.container.resolve(BackendService);

		this.mainWindow = new MainWindow(this.isDevelopment, this.contentFolder, this.log);
		this.mainWindow.create();
		const splashWindow = new SplashWindow(this.contentFolder);
		splashWindow.open();

		try {
			if (await applicationConfigurationHandler.isApplicationConfigurationCreated()) {
				const applicationConfiguration = await applicationConfigurationHandler.readApplicationConfiguration();
				const portNumber = applicationConfiguration.backendServicePortNumber;
				await this.backendService.ensureStarted(this.isDevelopment)
					? this.log.logInformation(`Backend service started on port: ${portNumber}.`)
					: this.log.logError(`Service can not be started on ${portNumber}.`);
			}
		}
		catch (error) {
			this.log.logException(error);
			this.backendService.stop();
		}
		finally {
			splashWindow.close();
		}

		this.mainWindow.show();
	}

	private createInstallationService(): void {
		if (this.installationService !== undefined) {
			return;
		}

		this.installationService = this.container.resolve(InstallationService);
	}

	private onActivate(): void {
		// On OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		// TODO: Check on Mac if it does work.
		this.mainWindow.create();
	}

	private onWindowAllClosed(): void {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit();
		}

		this.log.logInformation('Exit...');
		this.backendService.stop();
	}

	private onOpenUrl(): void {
		(event: Event, url: string) => {
			this.log.logInformation(`open-url event with url: ${url}`);
			this.authenticateWithCode(['todo', url]);
		};
	}

	// TODO: Extract it into separate class.
	private authenticateWithCode(otherInstanceArguments: string[]): void {
		this.log.logInformation(`authenticateWithCode: ${otherInstanceArguments.join(', ')}`);
		if (otherInstanceArguments.length !== 2) {
			throw new Error('Number of arguments is invalid.');
		}

		const payload = otherInstanceArguments[1];
		const match = /^eveauth-evehq-ng:\/\/sso-auth\/\?code=(.+?)&state=(.+?)$/.exec(payload);

		if (match != null) {
			const [code, state] = match;
			const localAuthenticationServiceUrl =
				`${this.serviceBaseUrl}/authentication/authenticateWithCode?codeUri=${code}&state=${state}`;
			const authenticationRequest = net.request({
				url: localAuthenticationServiceUrl,
				method: 'POST'
			});
			authenticationRequest.on(
				'response',
				response => {
					this.log.logWarning(`Status of authentication call: ${response.statusCode}`);
				});
			authenticationRequest.end();
		}
		else {
			throw new Error('Bad format of authentication code replay.');
		}
	}

	private backendService: BackendService;
	private mainWindow: MainWindow;
	private serviceBaseUrl = 'http://localhost:55555/api';
	private installationService: InstallationService;
	private readonly log: LogBase;
	private readonly containerBuilder: ContainerBuilder;
	private readonly contentFolder: string;
}
