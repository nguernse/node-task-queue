import { Job } from "bullmq";

export type ScrapeAction = "metadata" | "pdf" | "screenshot";
export type ScrapeReturnType = Metadata | Buffer | Blob | null;
export type ScrapeJobDataType = { url: string };
export type ScrapeJob = Job<ScrapeJobDataType, ScrapeReturnType, ScrapeAction>;
export type MathAction = "add" | "subtract" | "divide" | "multiply";
export type MathReturnType = number | null;
export type MathJobDataType = { x: number | string; y: number | string };
export type MathJob = Job<MathJobDataType, MathReturnType, MathAction>;
export type AnyJobAction = ScrapeAction | MathAction;
export type AnyJobDataType = ScrapeJobDataType | MathJobDataType;
export type AnyJob = ScrapeJob | MathJob;
export type AnyJobs = AnyJob[];
export type AnyJobReturnType = ScrapeReturnType | MathReturnType;
export type Metadata = {
  title?: string;
  description?: string;
  image_url?: string;
  url?: string;
};
export type AnyJobRequest = {
  name: AnyJobAction;
  data: AnyJobDataType;
};
export type WithClassname = { className?: string };
export type APIResponse<T = any> = {
  message: string;
  errors?: Record<string, any>;
  data: T;
};
export type JobCounts = {
  active: number;
  completed: number;
  delayed: number;
  failed: number;
  paused: number;
  prioritized: number;
  waiting: number;
  "waiting-children": number;
};
export type JobCountResponse = APIResponse<JobCounts>;
export type ActiveJobs = {
  count: number;
  jobs: AnyJob[];
};
export type ActiveJobsResponse = APIResponse<ActiveJobs>;
