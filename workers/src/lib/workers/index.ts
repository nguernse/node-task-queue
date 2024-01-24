import { Job, Worker, WorkerOptions } from "bullmq";
import jobHandler from "../job-handlers";
import Config from "../config";

const WorkerConfig: WorkerOptions = {
  connection: Config.workerConnection,
  autorun: false,
};

const taskWorker = new Worker("task_queue", jobHandler, WorkerConfig);

taskWorker.on("completed", (job: Job, result: any) => {
  console.log("Job completed with result", result);
});

taskWorker.on("failed", (job: any, error: Error) => {
  console.log("Failed Job", job);
  console.log("Failed message", error.message);
});

taskWorker.on("error", (error: Error) => {
  console.log("Error occured in worker", error.message);
});

export default taskWorker;
