import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  readonly status: number;
  readonly inner: string;

  constructor(error: string = "NOT_FOUND_404") {
    super(error);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.status = StatusCodes.NOT_FOUND;
    this.name = "NotFoundError";
    this.inner = error;
  }
}

export class BadRequestError extends Error {
  readonly status: number;
  readonly inner: string;

  constructor(error: string = "Bad Request") {
    super(error);
    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.status = StatusCodes.BAD_REQUEST;
    this.name = "BadRequestError";
    this.inner = error;
  }
}
