import axios from 'axios';
import { ApplicationConfigurationHolder } from './application-configuration-holder';
import { SupportsInjection } from 'good-injector';
import { LogBase } from './log-base';
import { SystemErrorDescriber } from './system-error-describer';

@SupportsInjection
export class InstallationChecker {
	constructor(
		private readonly applicationConfigurationHolder: ApplicationConfigurationHolder,
		private readonly systemErrorDescriber: SystemErrorDescriber,
		private readonly log: LogBase) {}

	public async isApplicationInstalled(): Promise<boolean> {
		return this.applicationConfigurationHolder.getApplicationConfiguration()
			.then(applicationConfiguration => applicationConfiguration.isApplicationInstalled);
	}

}
