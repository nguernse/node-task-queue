import { Job, Worker, WorkerOptions } from "bullmq";
import jobHandler from "../job-handlers";

const WorkerConfig: WorkerOptions = {
  connection: {
    host: "redis_queue",
    port: 6379,
  },
  autorun: false,
};

const taskWorker = new Worker("task_queue", jobHandler, WorkerConfig);

taskWorker.on("completed", (job: Job, result: number | null) => {
  console.log(`Job completed with result ${result}`);
});

taskWorker.on("failed", (job: any, error: Error) => {
  console.log("Failed Job", job);
  console.log("Failed message", error.message);
});

taskWorker.on("error", (error: Error) => {
  console.log("Error occured in worker", error.message);
});

export default taskWorker;
