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
