import { Job as BullJob } from "bullmq";
import addData from "./addData";
import subtractData from "./subtractData";
import multiplyData from "./multiplyData";
import divideData from "./divideData";

export default async function jobHandler(job: BullJob): Promise<number | null> {
  const {
    name,
    data: { x, y },
  } = job;

  let result: number | null = null;

  switch (name) {
    case "add":
      result = addData(x, y);
      break;
    case "subtract":
      result = subtractData(x, y);
      break;
    case "multiply":
      result = multiplyData(x, y);
      break;
    case "divide":
      result = divideData(x, y);
      break;
  }

  return result;
}
