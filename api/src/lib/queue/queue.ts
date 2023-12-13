import { Queue, QueueOptions } from "bullmq";

const QueueConfig: QueueOptions = {
  connection: {
    host: "redis_queue",
    port: 6379,
  },
  defaultJobOptions: {
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
  },
};

const jobQueue = new Queue("task_queue", QueueConfig);

jobQueue.on("error", (error: Error) => {
  console.log("Job Queue error:", error.message);
});

export default jobQueue;
