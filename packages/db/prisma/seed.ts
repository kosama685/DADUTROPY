import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const users = await Promise.all([
    prisma.user.create({ data: { email: "superadmin@example.com", name: "Super Admin", role: "SUPER_ADMIN", passwordHash } }),
    prisma.user.create({ data: { email: "owner@example.com", name: "Org Owner", role: "ORG_OWNER", passwordHash } }),
    prisma.user.create({ data: { email: "admin@example.com", name: "Org Admin", role: "ORG_ADMIN", passwordHash } }),
    prisma.user.create({ data: { email: "dev@example.com", name: "Developer", role: "DEVELOPER", passwordHash } }),
    prisma.user.create({ data: { email: "viewer@example.com", name: "Viewer", role: "VIEWER", passwordHash } })
  ]);
  const org = await prisma.organization.create({ data: { name: "Demo Organization" } });
  await prisma.organizationMember.createMany({ data: users.slice(1).map((u) => ({ organizationId: org.id, userId: u.id, role: u.role })) });
  const team = await prisma.team.create({ data: { name: "Demo Team", organizationId: org.id } });
  const project = await prisma.project.create({ data: { name: "Demo Project", organizationId: org.id, teamId: team.id } });
  const repo = await prisma.repository.create({ data: { projectId: project.id, name: "demo-repo", provider: "manual" } });
  await prisma.repositoryFile.createMany({ data: [{ repositoryId: repo.id, path: "src/index.ts", content: "export const hello = () => 'hello';" }] });
  const session = await prisma.agentSession.create({ data: { projectId: project.id, mode: "build", status: "completed" } });
  await prisma.reviewJob.create({ data: { projectId: project.id, status: "completed", summary: "No critical issues" } });
  await prisma.automation.create({ data: { projectId: project.id, name: "Nightly Review", trigger: "cron:0 2 * * *", action: "run_review" } });
  await prisma.usageEvent.create({ data: { organizationId: org.id, metric: "tokens", value: 1024 } });
  await prisma.auditLog.create({ data: { organizationId: org.id, actorId: users[0].id, action: "seed.initialized", metadata: { sessionId: session.id } } });
}

main().finally(() => prisma.$disconnect());
