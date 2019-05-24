import { IpcError } from './ipc-error';

export class IpcResult {
	public isSuccessful: boolean;
	public result?: any;
	public error?: IpcError;

	public static success<TResult>(result?: TResult): IpcResult {
		return { isSuccessful: true, result: result };
	}

	public static error(message: string, description?: string): IpcResult {
		return {
			isSuccessful: false,
			error: { message: message, description: description }
		};
	}
}
