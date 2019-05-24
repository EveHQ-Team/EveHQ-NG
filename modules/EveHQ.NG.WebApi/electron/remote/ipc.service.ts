import { ipcMain } from 'electron';
import { IpcResult } from '../ipc-shared/ipc-result';
import { SystemErrorDescriber } from '../infrastructure/system-error-describer';

export abstract class IpcServiceBase {
	protected constructor(private readonly systemErrorDescriber: SystemErrorDescriber) {}

	public abstract register(): void;

	protected registerGetHandler<TValue>(channel: string, getter: () => Promise<TValue>, errorMessage: string): void {
		ipcMain.on(
			channel,
			async (event: any) => {
				let result: IpcResult;
				try {
					result = IpcResult.success(await getter());
				}
				catch (error) {
					result = IpcResult.error(errorMessage, this.systemErrorDescriber.describeError(error));
				}

				event.sender.send(channel, result);
			});
	}

	protected registerSetHandler<TValue>(channel: string, setter: (value: TValue) => Promise<void>, errorMessage: string): void {
		ipcMain.on(
			channel,
			async (event: any, value: TValue) => {
				let result: IpcResult;
				try {
					await setter(value);
					result = IpcResult.success();
				}
				catch (error) {
					result = IpcResult.error(errorMessage, this.systemErrorDescriber.describeError(error));
				}

				event.sender.send(channel, result);
			});
	}
}
