import { app } from 'electron';

export class Folders {
	public static get defaultDataFolderPath(): string {
		return app.getPath('userData');
	}

	public static readonly configurationFolderName = 'configuration';
	public static readonly databasesFolderName = 'databases';
	public static readonly logFilesFolderName = 'logs';
}
