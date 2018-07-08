import { app, BrowserWindow, screen, net } from 'electron';
import { ContainerBuilder } from './infrastructure/container-builder';
import { Container } from 'good-injector';
import {BackendService} from './backend-service';
import {InstallationService} from './installation.service';

export class EveHqApplication {

	constructor(private readonly isDevelopment: boolean) {
		this.containerBuilder = new ContainerBuilder();
		this.ensureSingleInstance();
		this.registerEventHandlers();
	}

	public stop() {
		this.mainWindow = undefined;
	}

	private get container(): Container {
		return this.containerBuilder.container;
	}

	private ensureSingleInstance(): void {
		const isItSecondInstance = app.makeSingleInstance(
			(otherInstanceArguments: string[], workingDirectory: string) => {
				if (this.mainWindow) {
					if (this.mainWindow.isMinimized()) {
						this.mainWindow.restore();
					}

					this.mainWindow.focus();
					this.authenticateWithCode(otherInstanceArguments);
				}
			});

		if (isItSecondInstance) {
			app.exit();
		}
	}

	private registerEventHandlers(): void {
		app.on('ready', () => this.onReady());
		app.on('window-all-closed', () => this.onWindowAllClosed());
		app.on('activate', () => this.onActivate());
		app.on('open-url', () => this.onOpenUrl());
	}

	private onReady(): void {
		// ReSharper disable once UnusedLocals Event handler.
		const installationService = this.container.resolve(InstallationService);

		let splashWindow = this.createSplashWindow();
		const backendServicePortNumber = 55555;
		this.backendService = new BackendService(backendServicePortNumber, this.isDevelopment);
		this.backendService.isServiceStartedEvent.subscribe((isStarted: boolean) => {
			if (this.mainWindow === undefined) {
				console.log(`Main window opening: ${isStarted}`);
				this.createMainWindow();
				this.mainWindow.webContents.openDevTools();
			}

			splashWindow.close();
			splashWindow = undefined;

			if (isStarted) {
				console.warn('Service can not be started.');
			}
		});

		this.backendService.ensureStarted();
	}

	private onActivate(): void {
		// On OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (this.mainWindow === undefined) {
			this.createMainWindow();
		}
	}

	private onWindowAllClosed(): void {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit();
		}

		console.log('exit...');
		this.backendService.stop();
	}

	private onOpenUrl(): void {
		(event: Event, url: string) => {
			this.logInformation(`open-url event with url: ${url}`);
			this.authenticateWithCode(['todo', url]);
		};
	}

	private createMainWindow(): void {
		const electronScreen = screen;
		const size = electronScreen.getPrimaryDisplay().workAreaSize;

		// Create the browser window.
		this.mainWindow = new BrowserWindow({
			x: 0,
			y: 0,
			width: size.width,
			height: size.height
		});

		// and load the index.html of the app.
		this.mainWindow.loadURL(`file://${__dirname}/index.html`);

		// Open the DevTools.
		if (this.isDevelopment) {
			this.mainWindow.webContents.openDevTools();
		}

		// Emitted when the window is closed.
		this.mainWindow.on('closed',
			() => {
				// Dereference the window object, usually you would store window
				// in an array if your app supports multi windows, this is the time
				// when you should delete the corresponding element.
				this.mainWindow = undefined;
			});

		this.mainWindow.on('unresponsive', () => this.logExceptionToApi(new Error('Main window is unresponsive.')));
		this.mainWindow.webContents.on('crashed',
			(event: any, killed: boolean) => this.logExceptionToApi(new Error(`Renderer process crashed. Killed: ${killed}.`)));
	}

	private createSplashWindow(): BrowserWindow {
		const displaySize = screen.getPrimaryDisplay().workAreaSize;
		const width = 300;
		const height = 400;

		const splashWindow = new BrowserWindow({
			x: (displaySize.width - width) / 2,
			y: (displaySize.height - height) / 2,
			width: width,
			height: height
		});

		splashWindow.loadURL(`file://${__dirname}/splash.html`);

		return splashWindow;
	}

	private authenticateWithCode(otherInstanceArguments: string[]): void {
		this.logInformation(`authenticateWithCode: ${otherInstanceArguments.join(', ')}`);
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
					console.warn(`Status of authentication call: ${response.statusCode}`);
				});
			authenticationRequest.end();
		}
		else {
			throw new Error('Bad format of authentication code replay.');
		}
	}

	private logInformation(message: string): void {
		log(message, 'information');
	}

	private logExceptionToApi(error: Error): void {
		const message = `${JSON.stringify(`Uncaught exception in the ${process.type} Electron process:\n${error.stack}`)}`;
		log(message, 'error');
	}

	private log(message: string, messageKind: string): void {
		const clientLoggingUrl = `${this.serviceBaseUrl}/clientlogging/${messageKind}`;
		const logRequest = net.request({
			url: clientLoggingUrl,
			method: 'POST'
		});

		logRequest.setHeader('Content-Type', 'application/json');
		logRequest.write(message);
		logRequest.on(
			'response',
			response => {
				console.warn(`Status of log error call: ${response.statusCode}`);
			});
		logRequest.on(
			'error',
			error1 => {
				console.warn(`Error on log error call: ${error1.message}`);
			});
		logRequest.end();
	}

	private backendService: BackendService;
	private mainWindow: Electron.BrowserWindow | undefined;
	private serviceBaseUrl = 'http://localhost:55555/api';
	private readonly containerBuilder: ContainerBuilder;
}
