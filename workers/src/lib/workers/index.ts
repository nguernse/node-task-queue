import { Job, Worker } from "bullmq";
import jobHandler from "../job-handlers";

const QueueConfig = {
  connection: {
    host: "redis_queue",
    port: 6379,
  },
  autorun: false,
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 30000,
  },
  removeOnComplete: {
    age: 24 * 3600,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
};

const taskWorker = new Worker("task_queue", jobHandler, QueueConfig);

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
