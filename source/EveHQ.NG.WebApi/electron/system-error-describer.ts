import { ErrorCode } from './error-code';

export class SystemErrorDescriber {
	public describeError(errorCode: string | number): string {
		switch (errorCode) {
			case ErrorCode.OperationNotPermited:
				return 'Operation not permitted.';
			case ErrorCode.PermissionDenide:
				return 'Permission denied.';
			default:
				return `Unknown error code: '${errorCode}'.`;
		}
	}
}
