import * as path from 'path';
import * as fse from 'fs-extra';
import { SupportsInjection } from 'good-injector';
import { ApplicationConfigurationHolder } from './application-configuration-handler';
import { Folders } from './folders';
import {ApplicationConfiguration} from '../ipc-shared/application-configuration';

@SupportsInjection
export class DataFolderManager {
	constructor(private readonly applicationConfigurationHolder: ApplicationConfigurationHolder) {
		applicationConfigurationHolder.getApplicationConfiguration()
			.then(applicationConfiguration => this.dataFolderPath = applicationConfiguration.dataFolderPath);
		applicationConfigurationHolder.on(
			'changed',
			(applicationConfiguration: ApplicationConfiguration) => this.handleConfigurationChange(applicationConfiguration));
	}

	public get configurationFolderPath(): string {
		return path.join(this.dataFolderPath, Folders.configurationFolderName);
	}

	public async handleConfigurationChange(applicationConfiguration: ApplicationConfiguration): Promise<void> {
		const newPath = await this.validateAndNormalizePath(applicationConfiguration.dataFolderPath);
		if (!applicationConfiguration.isApplicationInstalled) {
			return this.initializeDataFolder(newPath);
		}

		const isDataFolderPathChanged = this.dataFolderPath.localeCompare(newPath) !== 0;
		if (!isDataFolderPathChanged) {
			return Promise.resolve();
		}

		const doesOldDataFolderInitialized = await this.doesDataFolderInitialized(this.dataFolderPath);
		const doesNewDataFolderInitialized = await this.doesDataFolderInitialized(newPath);

		if (doesOldDataFolderInitialized && !doesNewDataFolderInitialized) {
			return this.moveDataFolderToNewLocation(newPath);
		}

		if (!doesOldDataFolderInitialized && doesNewDataFolderInitialized) {
			this.dataFolderPath = newPath;
			return Promise.resolve();
		}

		if (doesOldDataFolderInitialized && doesNewDataFolderInitialized) {
			return Promise.reject('TODO: Both initialized. What to do? Merge? Throw? TBD.');
		}

		return this.initializeDataFolder(newPath);
	}

	private async initializeDataFolder(dataFolderPath: string): Promise<void> {
		this.dataFolderPath = dataFolderPath;
		return this.createRequiredFolders(dataFolderPath);
	}

	private async moveDataFolderToNewLocation(newPath: string): Promise<void> {
		this.dataFolderPath = newPath;
		return Promise.reject('TODO: Move data to the new location.');
	}

	private async createRequiredFolders(dataFolderPath: string): Promise<void> {
		return Promise.all(this.requiredFolderNames.map(folderName => fse.ensureDir(path.join(dataFolderPath, folderName))))
			.then(() => Promise.resolve())
			.catch(error => Promise.reject(error));
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

	private dataFolderPath: string;
	private readonly requiredFolderNames = [
		Folders.configurationFolderName,
		Folders.databasesFolderName
	];
}
