import { app, BrowserWindow, screen, net } from 'electron';
import { InstallationService } from './installation.service';
import { ApiService } from './api-service';
import { SystemErrorDescriber } from './system-error-describer';
import { TcpPort } from './tcp-port';
import { ApplicationConfigurationHandler } from './application-configuration-handler';
import { InstallationChecker } from './installation-checker';

let apiService: ApiService;

const args = process.argv.slice(1);
let isDevelopment = args.some(val => val === '--serve');
const serviceBaseUrl = 'http://localhost:5000/api';

require('electron-unhandled')({ logger: logExceptionToApi, showDialog: false });

if (isDevelopment) {
	require('electron-reload')(__dirname);
}

let mainWindow: Electron.BrowserWindow | null;
try {
	let isItSecondInstance = app.makeSingleInstance(
		(otherInstanceArguments: string[], workingDirectory: string) => {
			if (mainWindow) {
				if (mainWindow.isMinimized()) {
					mainWindow.restore();
				}

				mainWindow.focus();
				authenticateWithCode(otherInstanceArguments);
			}
		});

	if (isItSecondInstance) {
		app.exit();
	}

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on(
		'ready',
		() => {
			const tcpPort = new TcpPort();
			const systemErrorDescriber = new SystemErrorDescriber();
			const applicationConfigurationHandler = new ApplicationConfigurationHandler(tcpPort, systemErrorDescriber);
			const installationChecker = new InstallationChecker(applicationConfigurationHandler);
			// ReSharper disable once UnusedLocals Event handler.
			const installationService = new InstallationService(
				systemErrorDescriber,
				installationChecker,
				applicationConfigurationHandler);

			let splashWindow = createSplashWindow();
			apiService = new ApiService(isDevelopment);
			apiService.isServiceStartedEvent.subscribe((isStarted: boolean) => {
				if (mainWindow == null) {
					console.log(`Main window opening: ${isStarted}`);
					createMainWindow();
					mainWindow.webContents.openDevTools();
				}

				splashWindow.close();
				splashWindow = null;

				if (isStarted) {
					console.warn('Service can not be started.');
				}
			});

			apiService.ensureStarted();
		});

	// Quit when all windows are closed.
	app.on(
		'window-all-closed',
		() => {
			// On OS X it is common for applications and their menu bar
			// to stay active until the user quits explicitly with Cmd + Q
			if (process.platform !== 'darwin') {
				app.quit();
			}

			console.log('exit...');
			apiService.stop();
		});

	app.on(
		'activate',
		() => {
			// On OS X it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (mainWindow === null) {
				createMainWindow();
			}
		});

	app.on(
		'open-url',
		(event: Event, url: string) => {
			logInformation(`open-url event with url: ${url}`);
			authenticateWithCode(['todo', url]);
		}
	);
}
finally {
	mainWindow = null;
}

function createSplashWindow(): BrowserWindow {
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

function createMainWindow() {
	const electronScreen = screen;
	const size = electronScreen.getPrimaryDisplay().workAreaSize;

	// Create the browser window.
	mainWindow = new BrowserWindow({
		x: 0,
		y: 0,
		width: size.width,
		height: size.height
	});

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/index.html`);

	// Open the DevTools.
	if (isDevelopment) {
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	mainWindow.on('closed',
		() => {
			// Dereference the window object, usually you would store window
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null;
		});

	mainWindow.on('unresponsive', () => logExceptionToApi(new Error('Main window is unresponsive.')));
	mainWindow.webContents.on('crashed',
		(event: any, killed: boolean) => logExceptionToApi(new Error(`Renderer process crashed. Killed: ${killed}.`)));
}

function authenticateWithCode(otherInstanceArguments: string[]) {
	logInformation(`authenticateWithCode: ${otherInstanceArguments.join(', ')}`);
	if (otherInstanceArguments.length !== 2) {
		throw new Error('Number of arguments is invalid.');
	}

	const payload = otherInstanceArguments[1];
	const match = /^eveauth-evehq-ng:\/\/sso-auth\/\?code=(.+?)&state=(.+?)$/.exec(payload);

	if (match != null) {
		const [code, state] = match;
		const localAuthenticationServiceUrl =
			`${serviceBaseUrl}/authentication/authenticateWithCode?codeUri=${code}&state=${state}`;
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

function logInformation(message: string) {
	log(message, 'information');
}

function logExceptionToApi(error: Error) {
	const message = `${JSON.stringify(`Uncaught exception in the ${process.type} Electron process:\n${error.stack}`)}`;
	log(message, 'error');
}

function log(message: string, messageKind: string) {
	const clientLoggingUrl = `${serviceBaseUrl}/clientlogging/${messageKind}`;
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
