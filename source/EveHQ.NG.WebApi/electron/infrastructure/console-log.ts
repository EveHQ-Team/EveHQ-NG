import { LogBase } from './log-base';
import { LogLevel } from './log-level';
import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class ConsoleLog extends LogBase {
	public log(message: string, level: LogLevel): void {
		switch (level) {
			case LogLevel.Warning:
				console.warn(message);
				break;
			case LogLevel.Error:
				console.error(message);
				break;
			case LogLevel.Information:
			default:
				console.log(message);
				break;
		}
	}

	public prepareExceptionMessage(error: Error): string {
		return error.toString();
	}
}
