import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
};
