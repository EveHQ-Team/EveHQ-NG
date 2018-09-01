import { Container } from 'good-injector';
import { TcpPort } from './tcp-port';
import { SystemErrorDescriber } from './system-error-describer';
import { ApplicationConfigurationHolder } from './application-configuration-holder';
import { InstallationChecker } from './installation-checker';
import { LogBase } from './log-base';
import { ConsoleLog } from './console-log';
import { BackendService } from './backend-service';
import { DataFolderManager } from './data-folder-manager';
import { SsoConfigurationHolder } from './sso-configuration-holder';
import { ApiService } from '../backend/api.service';
import { IsAliveService } from '../backend/is-alive.service';
import { IpcApplicationConfigurationService} from '../remote/ipc-application-configuration.serive';
import { IpcSsoConfigurationService} from '../remote/ipc-sso-configuration.service';
import { IpcServiceCollection } from '../remote/ipc-service-collection';

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
		this.container.registerSingleton(IpcApplicationConfigurationService);
		this.container.registerSingleton(IpcSsoConfigurationService);
		this.container.registerSingleton(IpcServiceCollection);
		this.container.registerSingleton(LogBase, ConsoleLog);
		this.container.registerSingleton(BackendService);
		this.container.registerSingleton(DataFolderManager);
		this.container.registerSingleton(SsoConfigurationHolder);
		this.container.registerSingleton(ApiService);
		this.container.registerSingleton(IsAliveService);
	}
}
