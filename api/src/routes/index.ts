import { Router } from "express";

import jobsRouter from "./jobs";
import healthRouter from "./health";

const baseRouter = Router();

baseRouter.use("/", jobsRouter);
baseRouter.use("/", healthRouter);

export default baseRouter;
