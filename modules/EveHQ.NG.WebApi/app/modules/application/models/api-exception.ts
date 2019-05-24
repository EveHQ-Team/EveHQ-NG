import { HttpErrorResponse } from '@angular/common/http';

export class ApiException {
	constructor(
		public readonly message: string,
		public readonly errors: ApiError[],
		public readonly status: number,
		public readonly url: string | undefined) {}

	public static fromHttpErrorResponse(errorResponse: HttpErrorResponse, message?: string): ApiException {
		return new ApiException(
			message ? message : errorResponse.message,
			errorResponse.error,
			errorResponse.status,
			errorResponse.url ? errorResponse.url : undefined);
	}
}

export interface ApiError {
	errorCode: number;
	message: string;
}
