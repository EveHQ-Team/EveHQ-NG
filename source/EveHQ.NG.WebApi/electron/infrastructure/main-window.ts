import { BrowserWindow, screen } from 'electron';
import { LogBase } from './log-base';

export class MainWindow {
	constructor(
		private readonly isDevelopment: boolean,
		private readonly contentFolder: string,
		private readonly log: LogBase) {}

	public get isOpen(): boolean {
		return this.window !== undefined;
	}

	public create(): void {
		this.log.info('Open the main window.');

		if (this.isOpen) {
			this.log.info('The main window is already open.');
			return;
		}

		const electronScreen = screen;
		const size = electronScreen.getPrimaryDisplay().workAreaSize;

		// Create the browser window.
		this.window = new BrowserWindow({
			x: 0,
			y: 0,
			width: size.width,
			height: size.height,
			show: false
		});

		// Emitted when the window is closed.
		this.window.on(
			'closed',
			() => {
				// Dereference the window object, usually you would store window
				// in an array if your app supports multi windows, this is the time
				// when you should delete the corresponding element.
				this.log.info('### on window closed.');
				this.window = undefined;
			});

		this.window.on(
			'unresponsive',
			() => this.log.error('Main window is unresponsive.'));

		this.window.webContents.on(
			'crashed',
			(event: any, killed: boolean) => this.log.error(`Renderer process crashed. Killed: ${killed}.`));

		if (this.isDevelopment) {
			this.window.webContents.openDevTools();
		}
	}

	public show(): void {
		this.window.loadURL(`file://${this.contentFolder}/index.html`);

		if (this.isDevelopment) {
			this.window.webContents.openDevTools();
		}

		this.window.show();
	}

	public close(): void {
		this.log.info('Closing the main window.');
		this.window = undefined;
	}

	public restoreIfMinimized(): void {
		this.log.info('Restoring minimized main window.');
		if (this.window.isMinimized()) {
			this.window.restore();
		}

		this.window.focus();
	}

	private window: BrowserWindow | undefined = undefined;
}
