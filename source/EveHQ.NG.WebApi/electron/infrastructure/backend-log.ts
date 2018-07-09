import { net } from 'electron';
import { LogBase } from './log-base';
import { LogLevel } from './log-level';
import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class BackendLog extends LogBase {
	public log(message: string, level: LogLevel): void {
		const clientLoggingUrl = `${this.serviceBaseUrl}/clientlogging/${level}`;
		// TODO: Use axios to talk to backend service.
		const logRequest = net.request({
			url: clientLoggingUrl,
			method: 'POST'
		});

		logRequest.setHeader('Content-Type', 'application/json');
		logRequest.write(message);
		logRequest.on(
			'response',
			response => {
				console.warn(`Status of log error call: ${response.statusCode}`);
			});
		logRequest.on(
			'error',
			error1 => {
				console.warn(`Error on log error call: ${error1.message}`);
			});
		logRequest.end();
	}

	public prepareExceptionMessage(error: Error): string {
		return `${JSON.stringify(`Uncaught exception in the ${process.type} Electron process:\n${error.stack}`)}`;
	}

	private serviceBaseUrl = 'http://localhost:55555/api'; // TODO: Should be based on application configuration port number.
}
