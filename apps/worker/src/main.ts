import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", { maxRetriesPerRequest: null });
export const indexingQueue = new Queue("indexing", { connection });
export const agentQueue = new Queue("agent", { connection });
new Worker("indexing", async (job) => ({ indexed: true, payload: job.data }), { connection });
new Worker("agent", async (job) => ({ done: true, payload: job.data }), { connection });
console.log("worker started");
