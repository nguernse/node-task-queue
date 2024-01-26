"use server";

import {
  APIResponse,
  ActiveJobsResponse,
  AnyJobAction,
  AnyJobDataType,
  JobCountResponse,
} from "../definitions";
import API from "../utils/api";
import { formDataDecorator } from "../utils/forms";

type BaseJob = { name: AnyJobAction; data: AnyJobDataType };

export const createScrapeJob = formDataDecorator(
  async (data: any): Promise<APIResponse> => {
    return createJob({ name: "metadata", data: { ...data } });
  }
);

export const createJob = async (job: BaseJob): Promise<APIResponse> => {
  return await API.post("/job", job);
};

export const getActiveJobs = async (): Promise<ActiveJobsResponse> => {
  return await API.get("/jobs/active");
};

export const getJobCounts = async (): Promise<JobCountResponse> => {
  return await API.get("/jobs/counts");
};
