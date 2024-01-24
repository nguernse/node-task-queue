import { AnyJob } from "../definitions";
import math from "./math";
import scrape from "./scrape";

export default async function jobHandler(job: AnyJob): Promise<any> {
  switch (job.name) {
    case "metadata":
    case "pdf":
    case "screenshot":
      return scrape(job);
    case "add":
    case "subtract":
    case "divide":
    case "multiply":
      return math(job);
    default:
      return null;
  }
}
