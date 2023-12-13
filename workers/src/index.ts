import taskWorker from "./lib/workers";

try {
  console.log("⏺️ Start Worker ⏺️");
  taskWorker.run();
  console.log("✅ Worker Started ✅");
} catch (error: any) {
  console.error("Could not start worker: ", error.message);
}

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing server...`);

  try {
    console.log("Gracefully closing worker...");
    await taskWorker.close();
    console.log("✅ Worker Closed ✅");
  } catch (error: any) {
    console.error("🚨 Failed to Close Worker 🚨", error.message);
    process.exit(1);
  }

  // Other asynchronous closings
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.error(err, "Uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  // Handle the error safely
  console.error({ promise, reason }, "Unhandled Rejection at: Promise");
});
