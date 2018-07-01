import { ipcMain } from 'electron';
import { InstallationIpc } from './ipc-shared/installation-ipc';

export class InstallationService {
	constructor() {
		console.warn('############ InstallationService constructed.');
		ipcMain.on(
			InstallationIpc.isApplicationInstalled,
			(event: any, argument: any) => {
				console.warn('############ isApplicationInstalledMessage requested.');
				event.sender.send(InstallationIpc.isApplicationInstalled, false);
			});

		ipcMain.on(
			InstallationIpc.getApplicationConfiguration,
			(event: any, args: any) => {
				event.sender.send(
					InstallationIpc.getApplicationConfiguration,
					{
						dataFolderPath: 'FFFFFFFFFFFFF',
						backendServicePortNumber: 8888
					});
			});
	}
}
