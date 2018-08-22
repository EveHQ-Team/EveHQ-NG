import * as path from 'path';
import * as fse from 'fs-extra';
import { app } from 'electron';
import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class DataFolderManager {
	constructor() {
		this.defaultDataFolderPath = app.getPath('userData');
		this.requiredFolderNames = [
			this.applicationConfigurationFolderName,
			this.databasesFolderName
		];
	}

	public readonly defaultDataFolderPath;

	public async initializeDataFolder(newPath: string, oldPath: string | undefined): Promise<void> {
		const normalizedNewPath = await this.validateAndNormalizePath(newPath);
		const normalizedOldPath = oldPath !== undefined ? await this.validateAndNormalizePath(oldPath) : oldPath;

		const isDataFolderPathChanged = normalizedOldPath && normalizedOldPath.localeCompare(normalizedNewPath) === 0;
		if (!isDataFolderPathChanged) {
			return Promise.resolve();
		}

		const doesOldDataFolderInitialized = normalizedOldPath && await this.doesDataFolderInitialized(normalizedOldPath);
		const doesNewDataFolderInitialized = await this.doesDataFolderInitialized(normalizedNewPath);
		if (!doesOldDataFolderInitialized && !doesNewDataFolderInitialized) {
			return this.initializeJustAfterInstall(normalizedNewPath);
		}

		if (doesOldDataFolderInitialized && !doesNewDataFolderInitialized) {
			// TODO: Move data to the new location.
			return Promise.resolve();
		}

		if (doesOldDataFolderInitialized && doesNewDataFolderInitialized) {
			// TODO: Both initialized. What to do? TBD.
			return Promise.resolve();
		}

		// TODO: Just use new data folder.
		return Promise.resolve();
	}

	private async initializeJustAfterInstall(dataFolderPath: string): Promise<void> {
		return this.createRequiredFolders(dataFolderPath);
	}

	private async createRequiredFolders(dataFolderPath: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			Promise.all(this.requiredFolderNames.map(folderName => fse.ensureDir(path.join(dataFolderPath, folderName))))
				.then(() => resolve())
				.catch(error => reject(error));
		});
	}

	private async doesDataFolderInitialized(dataFolderPath: string): Promise<boolean> {
		return Promise.all<boolean>(this.requiredFolderNames.map(folderName => fse.pathExists(path.join(dataFolderPath, folderName))))
			.then(folderExistanceResults => folderExistanceResults.every(doesFolderExist => doesFolderExist));
	}

	private async validateAndNormalizePath(pathToNormalize: string): Promise<string> {
		if (!pathToNormalize) {
			return Promise.reject('Path should be specified.');
		}

		const normalizedPath = path.normalize(pathToNormalize);
		if (!fse.pathExists(normalizedPath)) {
			return Promise.reject(`Path ${pathToNormalize} does not exist.`);
		}

		return Promise.resolve(normalizedPath);
	}

	private readonly applicationConfigurationFolderName = 'configuration';
	private readonly databasesFolderName = 'databases';
	private readonly requiredFolderNames: string[];
}
