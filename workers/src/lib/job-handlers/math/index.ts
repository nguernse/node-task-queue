import { MathJob } from "@/lib/definitions";

export default function math(job: MathJob): number {
  const { name } = job;
  let {
    data: { x, y },
  } = job;

  if (typeof x === "string") {
    x = Number(x);
  }

  if (typeof y === "string") {
    y = Number(y);
  }

  switch (name) {
    case "add":
      return x + y;
    case "subtract":
      return x - y;
    case "multiply":
      return x * y;
    case "divide":
      return x / y;
  }
}
