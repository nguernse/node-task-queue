import jobQueue from "./queue";
import { Job as BullJob } from "bullmq";

export type Job = {
  name: "add" | "subtract" | "multiply" | "divide";
  data: { x: number; y: number };
};

export async function addJob(job: Job): Promise<BullJob> {
  const newJob = await jobQueue.add(job.name, job.data);

  return newJob;
}
