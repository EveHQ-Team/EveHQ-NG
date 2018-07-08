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

	public open(): void {
		if (this.isOpen) {
			return;
		}

		const electronScreen = screen;
		const size = electronScreen.getPrimaryDisplay().workAreaSize;

		// Create the browser window.
		this.window = new BrowserWindow({
			x: 0,
			y: 0,
			width: size.width,
			height: size.height
		});

		// and load the index.html of the app.
		this.window.loadURL(`file://${this.contentFolder}/index.html`);

		// Open the DevTools.
		if (this.isDevelopment) {
			this.window.webContents.openDevTools();
		}

		// Emitted when the window is closed.
		this.window.on(
			'closed',
			() => {
				// Dereference the window object, usually you would store window
				// in an array if your app supports multi windows, this is the time
				// when you should delete the corresponding element.
				this.window = undefined;
			});

		this.window.on(
			'unresponsive',
			() => this.log.logException(new Error('Main window is unresponsive.')));
		this.window.webContents.on(
			'crashed',
			(event: any, killed: boolean) => this.log.logException(new Error(`Renderer process crashed. Killed: ${killed}.`)));

		if (this.isDevelopment) {
			this.window.webContents.openDevTools();
		}
	}

	public close(): void {
		this.window = undefined;
	}

	public restoreIfMinimized(): void {
		if (this.window.isMinimized()) {
			this.window.restore();
		}

		this.window.focus();
	}

	private window: BrowserWindow | undefined = undefined;
}
