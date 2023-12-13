import { Router } from "express";
import { addJob } from "../lib/queue/addJob";
import jobQueue from "../lib/queue/queue";
import { BadRequestError, NotFoundError } from "../lib/errors";

const baseRouter = Router();

// Submit a job to the queue
baseRouter.post("/job", async (req, res) => {
  const { x, y, name } = req.body;

  if (x === undefined || y === undefined || name === undefined) {
    throw new BadRequestError("Missing required parameters");
  }

  const job = await addJob({
    name,
    data: { x: parseInt(x), y: parseInt(y) },
  });

  res.status(200).json({ msg: "Job submitted", job_id: job.id });
});

baseRouter.get("/job/:id", async (req, res) => {
  const { id } = req.params;
  const job = await jobQueue.getJob(id);

  if (job === undefined) {
    throw new NotFoundError("Job not found");
  }

  res.status(200).json({ msg: "Job", id, job });
});

baseRouter.get("/job/:id/status", async (req, res) => {
  const { id } = req.params;
  const status = await jobQueue.getJobState(id);

  res.status(200).json({ msg: "Job status", id, status });
});

// View job status counts (active, completed, failed, delayed, waiting, paused)
baseRouter.get("/jobs/counts", async (req, res) => {
  const counts = await jobQueue.getJobCounts();

  res.status(200).json({ msg: "Job counts", counts });
});

baseRouter.get("/jobs/active", async (req, res) => {
  const active = await jobQueue.getJobs(["active"], 0, 100, true);

  res
    .status(200)
    .json({ msg: "Active jobs", count: active.length, jobs: active });
});

// Health check that API is up and running
baseRouter.get("/health", (req, res) => {
  res.status(200).json({ msg: "OK" });
});

export default baseRouter;
