import { Container } from 'good-injector';
import { TcpPort } from './tcp-port';
import { SystemErrorDescriber } from './system-error-describer';
import { ApplicationConfigurationHolder } from './application-configuration-handler';
import { InstallationChecker } from './installation-checker';
import { InstallationService } from './installation.service';
import { LogBase } from './log-base';
import { ConsoleLog } from './console-log';
import { BackendService } from './backend-service';
import { DataFolderManager } from './data-folder-manager';
import { SsoConfigurationHandler } from './sso-configuration-handler';

export class ContainerBuilder {
	constructor() {
		this.container = new Container();
		this.buildContainer();
	}

	public readonly container: Container;

	private buildContainer() {
		this.container.registerSingleton(TcpPort);
		this.container.registerSingleton(SystemErrorDescriber);
		this.container.registerSingleton(ApplicationConfigurationHolder);
		this.container.registerSingleton(InstallationChecker);
		this.container.registerSingleton(InstallationService);
		this.container.registerSingleton(LogBase, ConsoleLog);
		this.container.registerSingleton(BackendService);
		this.container.registerSingleton(DataFolderManager);
		this.container.registerSingleton(SsoConfigurationHandler);
	}
}
