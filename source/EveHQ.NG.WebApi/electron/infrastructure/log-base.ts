import { LogLevel } from './log-level';

export abstract class LogBase {
	public logInformation(message: string): void {
		// TODO: Prepare structural log message.
		this.log(message, LogLevel.Information);
	}

	public logWarning(message: string): void {
		// TODO: Prepare structural log message.
		this.log(message, LogLevel.Warning);
	}

	public logError(message: string): void {
		// TODO: Prepare structural log message.
		this.log(message, LogLevel.Error);
	}

	public logException(error: Error): void {
		const message = this.prepareExceptionMessage(error);
		this.log(message, LogLevel.Error);
	}

	public abstract log(message: string, level: LogLevel): void;

	public abstract prepareExceptionMessage(error: Error): string;
}
