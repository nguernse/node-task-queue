/************************************************************************************
 *                              Import and setup variables
 ***********************************************************************************/
import morgan from "morgan";
import cors from "cors";
import http from "http";
import helmet from "helmet";
import express, { Application, Request, Response } from "express";
import "express-async-errors";
import cookieParser from "cookie-parser";
import BaseRouter from "./routes";
import errorHandler from "./lib/middleware/errorHandler";
import { notFound } from "./lib/middleware/notFound";

const app: Application = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors());

/************************************************************************************
 *                              Register Routes and Handlers
 ***********************************************************************************/

// Add Endpoints
app.use("/", BaseRouter);

// Handle 404 Errors
app.use(notFound);

// Handle Errors
app.use(errorHandler);

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/
const server = http.createServer(app);

export default server;
