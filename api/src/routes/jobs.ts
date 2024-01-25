import { Router } from "express";
import { addJob, bulkAddJob } from "../lib/queue/addJob";
import jobQueue from "../lib/queue/queue";
import { NotFoundError } from "../lib/errors";
import { AnyJobRequest } from "@/lib/definitions";
import { Request } from "express";

const jobsRouter = Router();

// Submit a job to the queue
jobsRouter.post("/job", async (req: Request<{}, {}, AnyJobRequest>, res) => {
  const { name, data } = req.body;

  const job = await addJob({ name, data });

  res.status(200).json({ msg: "Job submitted", job_id: job.id });
});

jobsRouter.post(
  "/job/bulk",
  async (req: Request<{}, {}, { jobs: AnyJobRequest[] }>, res) => {
    const { jobs } = req.body;

    const bulkJobs = await bulkAddJob(jobs);

    res.status(200).json({ msg: "Jobs submitted", jobs: bulkJobs });
  }
);

jobsRouter.get("/job/:id", async (req, res) => {
  const { id } = req.params;
  const job = await jobQueue.getJob(id);

  if (job === undefined) {
    throw new NotFoundError("Job not found");
  }

  res.status(200).json({ msg: "Job", id, job });
});

jobsRouter.get("/job/:id/status", async (req, res) => {
  const { id } = req.params;
  const status = await jobQueue.getJobState(id);

  res.status(200).json({ msg: "Job status", id, status });
});

// View job status counts (active, completed, failed, delayed, waiting, paused)
jobsRouter.get("/jobs/counts", async (req, res) => {
  const counts = await jobQueue.getJobCounts();

  res.status(200).json({ msg: "Job counts", counts });
});

jobsRouter.get("/jobs/active", async (req, res) => {
  const active = await jobQueue.getJobs(["active"], 0, 100, true);

  res
    .status(200)
    .json({ msg: "Active jobs", count: active.length, jobs: active });
});

export default jobsRouter;
