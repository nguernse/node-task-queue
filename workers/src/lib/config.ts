/**
 * @todo put these values in .env files
 */
const Config = {
  // BROWSERLESS_CONNECTION: process.env.BROWSERLESS_CONNECTION,
  browserlessConnection: "ws://nginx:80",
  workerConnection: {
    host: "redis_queue",
    port: 6379,
  },
};

export default Config;
