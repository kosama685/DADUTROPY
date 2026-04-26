import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";
const redisUrl = process.env.REDIS_URL;

if (!redisUrl && isProduction) {
  console.error("[worker] Missing REDIS_URL in production. Refusing to start worker without Redis.");
  process.exit(1);
}

const connection = new IORedis(redisUrl ?? "redis://localhost:6379", {
  maxRetriesPerRequest: 1,
  retryStrategy: (times) => {
    if (times > 20) {
      console.error("[worker] Redis reconnect retry limit reached. Stopping retries.");
      return null;
    }

    return Math.min(times * 250, 2_000);
  },
});

connection.on("error", (error) => {
  console.error("[worker] Redis connection error:", error.message);
});

export const indexingQueue = new Queue("indexing", { connection });
export const agentQueue = new Queue("agent", { connection });

new Worker("indexing", async (job) => ({ indexed: true, payload: job.data }), { connection });
new Worker("agent", async (job) => ({ done: true, payload: job.data }), { connection });

console.log("worker started");
