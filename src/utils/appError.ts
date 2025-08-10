export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly status: string;

  constructor({
    message,
    statusCode,
    isOperational = true,
    type = "error",
  }: {
    message: string;
    statusCode: number;
    isOperational?: boolean;
    type?: string;
  }) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = type;

    Error.captureStackTrace(this, this.constructor);
  }
}
