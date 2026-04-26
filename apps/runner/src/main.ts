import Fastify from "fastify";
import { spawn } from "node:child_process";
import { z } from "zod";
const app = Fastify();
const deny = [/rm\s+-rf/, /:\(\)\{:\|:&\};:/, /shutdown/];
app.post("/execute", async (req, reply) => {
  const body = z.object({ command: z.string().min(1), cwd: z.string().optional() }).parse(req.body);
  if (deny.some((r) => r.test(body.command))) return reply.code(403).send({ error: "Command blocked by policy" });
  return new Promise((resolve) => {
    const child = spawn("bash", ["-lc", body.command], { cwd: body.cwd || process.cwd(), timeout: 15000 });
    let out = "";
    child.stdout.on("data", (d) => (out += d.toString()));
    child.stderr.on("data", (d) => (out += d.toString()));
    child.on("close", (code) => resolve({ code, output: out.replace(/(AKIA[0-9A-Z]{16})/g, "***") }));
  });
});
app.get("/health", async () => ({ ok: true }));
app.listen({ port: 4010, host: "0.0.0.0" });
