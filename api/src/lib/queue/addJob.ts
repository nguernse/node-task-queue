import { AnyJobRequest } from "../definitions";
import { Job } from "bullmq";
import jobQueue from "./queue";

export async function addJob(job: AnyJobRequest): Promise<Job> {
  const newJob = await jobQueue.add(job.name, job.data);

  return newJob;
}

export async function bulkAddJob(jobs: AnyJobRequest[]): Promise<Job[]> {
  const newJobs = await jobQueue.addBulk(jobs);

  return newJobs;
}
