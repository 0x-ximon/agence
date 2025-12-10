enum ErrorType {
  ApiError = "ApiError",
  AuthError = "AuthError",
  FatalError = "FatalError",
  NotFoundError = "NotFoundError",
  ValidationError = "ValidationError",
}

interface IError extends Error {
  errorType: ErrorType;
}

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

type ErrorParams = { message: string; cause?: Error; context?: Jsonable };

/*//////////////////////////////////////////////////////////////
                          GENERIC ERRORS
//////////////////////////////////////////////////////////////*/

export class AgenceError extends Error implements IError {
  public errorType: ErrorType;
  public readonly context: Jsonable;

  constructor(
    errorType: ErrorType,
    message: string,
    cause?: Error,
    context?: Jsonable,
  ) {
    super(`${errorType}: ${message}`, { cause });
    this.errorType = errorType;
    this.context = context;
  }
}

/**
 * An error from the API.
 * @param {ErrorParams} errorParams The error message, cause of the Error and any additional context
 * @extends AgenceError
 */
export class ApiError extends AgenceError {
  constructor({ message, cause, context }: ErrorParams) {
    super(ErrorType.ApiError, message, cause, context);
  }
}

/**
 * Authentication or authorization failed.
 * @param {ErrorParams} errorParams The error message, cause of the Error and any additional context
 * @extends AgenceError
 */
export class AuthError extends AgenceError {
  constructor({ message, cause, context }: ErrorParams) {
    super(ErrorType.AuthError, message, cause, context);
  }
}

/**
 * Program ran into an unrecoverable state.
 * @param {ErrorParams} errorParams The error message, cause of the Error and any additional context
 * @extends AgenceError
 */
export class FatalError extends AgenceError {
  constructor({ message, cause, context }: ErrorParams) {
    super(ErrorType.FatalError, message, cause, context);
  }
}

/**
 * Requested resource was not found.
 * @param {ErrorParams} errorParams The error message, cause of the Error and any additional context
 * @extends AgenceError
 */
export class NotFoundError extends AgenceError {
  constructor({ message, cause, context }: ErrorParams) {
    super(ErrorType.NotFoundError, message, cause, context);
  }
}

/**
 * An assertion or validation failed.
 * @param {ErrorParams} errorParams The error message, cause of the Error and any additional context
 * @extends AgenceError
 */
export class ValidationError extends AgenceError {
  constructor({ message, cause, context }: ErrorParams) {
    super(ErrorType.ValidationError, message, cause, context);
  }
}

/*//////////////////////////////////////////////////////////////
                          SERVICES ERRORS
//////////////////////////////////////////////////////////////*/
