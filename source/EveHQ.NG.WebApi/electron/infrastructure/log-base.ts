import { LogLevel } from './log-level';

export abstract class LogBase {
	public logInformation(message: string): void {
		log(message, LogLevel.Information);
	}

	public logException(error: Error): void {
		const message = this.prepareExceptionMessage(error);
		log(message, LogLevel.Error);
	}

	public abstract log(message: string, level: LogLevel): void;

	public abstract prepareExceptionMessage(error: Error): string;
}
