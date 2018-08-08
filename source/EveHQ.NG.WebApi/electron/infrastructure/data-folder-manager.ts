import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class DataFolderManager {
	public async moveDataIfRequired(previousPath: string, newPath: string): Promise<void> {
		const isDataFolderPathChanged = previousPath.toLocaleUpperCase().localeCompare(newPath.toLocaleUpperCase());
		if (!isDataFolderPathChanged) {
			return;
		}

		// TODO: Add real logic for moving data to the new location.
	}
}
