import { ErrorCode } from './error-code';
import { SupportsInjection } from 'good-injector';

@SupportsInjection
export class SystemErrorDescriber {
	public describeError(errorCode: string | number): string {
		switch (errorCode) {
			case ErrorCode.OperationNotPermited:
				return 'Operation not permitted.';
			case ErrorCode.PermissionDenide:
				return 'Permission denied.';
			case ErrorCode.NoSuchFileOrDirectory:
				return 'No such file or directory';
			case ErrorCode.ProcessDoesNotExists:
				return 'The process or process group does not exist.';
			case ErrorCode.ConnectionRefused:
				return 'Connection refused';
			default:
				return `Unknown error code: '${errorCode}'.`;
		}
	}
}
