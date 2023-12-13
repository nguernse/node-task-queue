/************************************************************************************
 *                              Start the Server
 ***********************************************************************************/

import app from "./app";
import Config from "./lib/config";

app.listen(Config.port, () => {
  console.log(`🚀 SERVER RUNNING ON: http://localhost:${Config.port} 🚀`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing server...`);

  try {
    console.log("Gracefully closing server...");
    app.close(() => {
      console.log("✅ Server Closed ✅");
      process.exit(0);
    });
  } catch (error: any) {
    console.error("🚨 Failed to Close Server 🚨", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
