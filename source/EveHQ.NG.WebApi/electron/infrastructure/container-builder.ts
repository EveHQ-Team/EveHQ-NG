import { Container } from 'good-injector';
import { TcpPort } from '../tcp-port';
import { SystemErrorDescriber } from '../system-error-describer';
import { ApplicationConfigurationHandler } from '../application-configuration-handler';
import { InstallationChecker } from '../installation-checker';
import { InstallationService } from '../installation.service';

export class ContainerBuilder {
	constructor() {
		this.container = new Container();
		this.buildContainer();
	}

	public readonly container: Container;

	private buildContainer() {
		this.container.registerSingleton(TcpPort);
		this.container.registerSingleton(SystemErrorDescriber);
		this.container.registerSingleton(ApplicationConfigurationHandler);
		this.container.registerSingleton(InstallationChecker);
		this.container.registerSingleton(InstallationService);
	}
}
