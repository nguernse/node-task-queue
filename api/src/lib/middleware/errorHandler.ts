import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof BadRequestError) {
    return res.status(error.status).send({ error: error.message });
  }

  if (error instanceof NotFoundError) {
    return res.status(error.status).send({ error: error.message });
  }

  const statusCode =
    res.statusCode === StatusCodes.OK
      ? StatusCodes.INTERNAL_SERVER_ERROR
      : res.statusCode;

  res
    .status(statusCode)
    .json({ error: "Something unexpected happened. Please try again." });
}
