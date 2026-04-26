export type Role =
  | "SUPER_ADMIN"
  | "ORG_OWNER"
  | "ORG_ADMIN"
  | "BILLING_ADMIN"
  | "SECURITY_ADMIN"
  | "TEAM_ADMIN"
  | "DEVELOPER"
  | "REVIEWER"
  | "VIEWER"
  | "SERVICE_ACCOUNT";

export type AgentStatus = "queued" | "running" | "waiting_for_approval" | "failed" | "completed" | "cancelled";
