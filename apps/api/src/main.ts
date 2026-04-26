import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const paged = z.object({ page: z.coerce.number().default(1), pageSize: z.coerce.number().default(20) });

export function buildApp() {
  const app = Fastify({ logger: true });
  app.register(cors, { origin: true, credentials: true });
  app.register(swagger, { openapi: { info: { title: "AI Dev Platform API", version: "1.0.0" } } });
  app.register(swaggerUi, { routePrefix: "/docs" });

  app.get("/", async () => ({
    message: "AI Dev Platform API",
    docs: "/docs",
    health: "/health",
    routes: "/routes"
  }));
  app.get("/routes", async () => ({
    routes: [
      "GET /",
      "GET /health",
      "POST /auth/login",
      "GET /users",
      "GET /organizations",
      "GET /projects",
      "GET /repositories",
      "GET /chat/conversations",
      "GET /agents",
      "GET /cloud-agents",
      "GET /reviews",
      "GET /automations",
      "GET /rules",
      "GET /skills",
      "GET /hooks",
      "GET /plugins",
      "GET /tools",
      "GET /integrations",
      "GET /models",
      "GET /usage",
      "GET /billing",
      "GET /audit-logs",
      "GET /notifications",
      "GET /admin/overview",
      "POST /webhooks/stripe",
      "GET /api-keys",
      "GET /service-accounts"
    ]
  }));
  app.get("/health", async () => {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true, database: "postgresql" };
  });
  app.post("/auth/login", async (req, reply) => {
    const body = z.object({ email: z.string().email(), password: z.string().min(8) }).parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) return reply.code(401).send({ error: "Invalid credentials" });
    return { user: { id: user.id, email: user.email, role: user.role } };
  });
  app.get("/users", async (req) => {
    const { page, pageSize } = paged.parse(req.query);
    return prisma.user.findMany({ skip: (page - 1) * pageSize, take: pageSize });
  });
  app.get("/organizations", async () => prisma.organization.findMany());
  app.get("/projects", async () => prisma.project.findMany());
  app.get("/repositories", async () => prisma.repository.findMany());
  app.get("/chat/conversations", async () => prisma.conversation.findMany({ include: { messages: true } }));
  app.get("/agents", async () => prisma.agentSession.findMany({ include: { steps: true } }));
  app.get("/cloud-agents", async () => prisma.cloudAgent.findMany());
  app.get("/reviews", async () => prisma.reviewJob.findMany({ include: { findings: true } }));
  app.get("/automations", async () => prisma.automation.findMany({ include: { runs: true } }));
  app.get("/rules", async () => prisma.rule.findMany());
  app.get("/skills", async () => prisma.skill.findMany());
  app.get("/hooks", async () => prisma.hook.findMany());
  app.get("/plugins", async () => prisma.plugin.findMany());
  app.get("/tools", async () => prisma.externalTool.findMany());
  app.get("/integrations", async () => prisma.integration.findMany());
  app.get("/models", async () => prisma.modelConfig.findMany({ include: { provider: true } }));
  app.get("/usage", async () => prisma.usageEvent.findMany());
  app.get("/billing", async () => prisma.billingSubscription.findMany());
  app.get("/audit-logs", async () => prisma.auditLog.findMany({ take: 100, orderBy: { createdAt: "desc" } }));
  app.get("/notifications", async () => prisma.notification.findMany());
  app.get("/admin/overview", async () => ({
    users: await prisma.user.count(), organizations: await prisma.organization.count(), projects: await prisma.project.count()
  }));
  app.post("/webhooks/stripe", async () => ({ received: true }));
  app.get("/api-keys", async () => prisma.apiKey.findMany());
  app.get("/service-accounts", async () => prisma.serviceAccount.findMany());

  app.setNotFoundHandler((req, reply) => {
    return reply.code(404).send({
      message: `Route ${req.method}:${req.url} not found`,
      error: "Not Found",
      statusCode: 404,
      hint: "Check GET /routes for the supported endpoints."
    });
  });

  return app;
}

if (require.main === module) {
  const app = buildApp();
  app.listen({ port: 4000, host: "0.0.0.0" });
}
