import { Role } from "@packages/types";

const matrix: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"],
  ORG_OWNER: ["org:manage", "billing:manage", "security:manage", "project:manage"],
  ORG_ADMIN: ["org:manage", "project:manage", "integration:manage"],
  BILLING_ADMIN: ["billing:manage", "usage:view"],
  SECURITY_ADMIN: ["audit:view", "security:manage", "model:manage"],
  TEAM_ADMIN: ["team:manage", "project:manage"],
  DEVELOPER: ["ide:use", "agent:run", "chat:use", "terminal:use"],
  REVIEWER: ["review:run", "review:comment"],
  VIEWER: ["read"],
  SERVICE_ACCOUNT: ["api:access", "automation:run"]
};

export const can = (role: Role, perm: string) => matrix[role].includes("*") || matrix[role].includes(perm);
