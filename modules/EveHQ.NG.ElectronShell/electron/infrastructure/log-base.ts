import { LogLevel } from './log-level';

export abstract class LogBase {
	public info(message: string): void {
		// TODO: Prepare structural log message.
		this.log(message, LogLevel.Information);
	}

	public warning(message: string): void {
		// TODO: Prepare structural log message.
		this.log(message, LogLevel.Warning);
	}

	public error(message: string): void {
		// TODO: Prepare structural log message.
		this.log(message, LogLevel.Error);
	}

	public exception(error: Error): void {
		const message = this.prepareExceptionMessage(error);
		this.log(message, LogLevel.Error);
	}

	public abstract log(message: string, level: LogLevel): void;

	public abstract prepareExceptionMessage(error: Error): string;
}
