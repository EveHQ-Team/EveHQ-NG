import { BrowserWindow, screen } from 'electron';

export class SplashWindow {
	constructor(private readonly contentFolder: string) {}

	public open(): void {
		if (this.window) {
			throw new Error('Splash window already open. Close it before you can reopen it.');
		}

		const width = 300;
		const height = 400;
		const displaySize = screen.getPrimaryDisplay().workAreaSize;

		this.window = new BrowserWindow({
			x: (displaySize.width - width) / 2,
			y: (displaySize.height - height) / 2,
			width: width,
			height: height
		});

		this.window.loadURL(`file://${this.contentFolder}/splash.html`);
	}

	public close(): void {
		this.window.close();
		this.window = undefined;
	}

	private window: BrowserWindow | undefined = undefined;
}
