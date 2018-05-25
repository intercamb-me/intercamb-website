import {HttpErrorResponse} from '@angular/common/http';

export class ApiError extends Error {

  public status?: number;
  public code: string;
  public message: string;
  public cause?: string;

  public static withResponse(err: HttpErrorResponse): ApiError {
    return new ApiError(err.error.code, err.error.message, err.status, err.error.cause);
  }

  constructor(code: string, message?: string, status?: number, cause?: any) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
    this.cause = cause;
  }
}
