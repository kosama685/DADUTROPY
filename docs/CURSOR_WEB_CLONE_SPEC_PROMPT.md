# Prompt: Build a Complete Web-Based Cursor.com Clone (Production-Ready Specification)

Use this prompt as the source-of-truth implementation blueprint for an AI code generator or engineering team. Build a full SaaS platform that replicates the complete feature set described below, with enterprise reliability, observability, and security.

## 0) Product Objective
Build a web-based AI-native IDE and team agent platform with:
- Browser IDE (VS Code-like, Monaco-powered)
- AI-native editing (Tab, Inline Edit, Chat, Agent, Composer)
- Autonomous agents with tools (terminal, browser, canvases)
- Multi-tenant org/team admin and policy controls
- Integrations (GitHub/GitLab/Slack/Linear/etc.)
- Marketplace/extensibility (MCP, skills, hooks, subagents)
- Billing/metering/plans
- Enterprise security/compliance and auditability
- CLI + ACP for external editor/IDE integration

---

## 1) Scope & Golden Feature Coverage Matrix
Implement every item below. Each item must have explicit acceptance tests and telemetry.

### A. Core AI-Powered Coding (Web IDE)
1. Advanced Tab Autocomplete (multi-line, rewrite, next-action prediction)
2. Inline Editing (Cmd/Ctrl+K) with color diff + accept/reject
3. AI Chat (Cmd/Ctrl+L), project-aware, Instant Apply
4. Agent Mode (Cmd/Ctrl+I), autonomous tools, multi-file edits, plan/debug modes
5. Composer 2 autonomy slider (assistive ↔ autonomous)
6. CLI parity (`debug`, `/btw`, `/config`, `/statusline`, non-interactive)

### B. Autonomous Agents & Automation
1. Up to 8 parallel agents, isolated worktrees, tiled monitoring
2. Cloud agents in isolated VM sandboxes
3. Scheduled/event automations (cron/webhook/SCM events)
4. Tooling: browser automation + screenshot + canvases

### C. Codebase Understanding
1. Context tags: `@Codebase`, `@Files`, `@Folders`, `@Docs`, `@Web`
2. Semantic search: vector + rerank + AST graph
3. Instant grep (sub-second)

### D. Collaboration & Team Management
1. Realtime multi-cursor editing, comments/threads
2. Org admin controls for rules/hooks/plugins/commands
3. Private team marketplace
4. Central controls: terminal sandbox, repo blocklists, model policy

### E. Model Flexibility
1. Provider routing: OpenAI, Anthropic, Gemini, xAI, custom endpoints
2. Private/local model endpoints
3. Internal model slots (Tab model + Composer family)

### F. Editor UX
1. AI-native IDE with Monaco + full workspace UX
2. Design Mode (visual tree + comment-to-code)
3. Voice dictation (batch STT)
4. Diff navigation to exact lines
5. Sharp text rendering / anti-aliasing controls
6. Mission Control live session grid

### G. Security & Privacy
1. Sandboxed terminal + network controls
2. Configurable security hooks
3. Privacy Mode (zero retention path)
4. Command/workspace trust mitigations
5. SOC2/GDPR/CCPA readiness + audit logs

### H. Integrations & Extensibility
1. Marketplace with 30+ official plugins
2. MCP + Skills + Subagents + Rules + Hooks architecture
3. Slack bot + PR creation flows
4. GitHub/GitLab bugbot/review/autofix
5. Linear issue delegation
6. ACP integrations for JetBrains/Xcode
7. Deeplinks for prompts/commands/rules

### I. Plans/Billing
- Hobby (free), Pro ($20), Pro+ ($60), Ultra ($200), Teams ($40/user), Enterprise custom
- Per-feature limits, pooled usage, overage handling

### J. Additional
- Bugbot learned rules + autofix
- Worktrees per task
- Multi-root workspaces
- Canvases
- Full CLI modes
- ACP JSON-RPC
- Analytics + adoption leaderboards

---

## 2) Architecture Blueprint (Describe + Implement)

### 2.1 Logical Architecture
- **Frontend Web App** (Next.js + Monaco + Yjs client)
- **API Gateway/BFF** (authn/authz, request shaping, SSE/WebSocket fanout)
- **Core Services**:
  1. Identity/Auth Service
  2. Org/Team/Policy Service
  3. Workspace/Git Service
  4. Indexing/Search Service
  5. AI Orchestrator Service
  6. Agent Runtime Control Plane
  7. Agent Sandbox Data Plane (VM/container workers)
  8. Realtime Collaboration Service
  9. Integrations Service
  10. Marketplace/Plugin Service
  11. Billing/Metering Service
  12. Analytics/Audit Service
  13. Notification Service
- **Data Plane**: Postgres, Redis, object store, vector DB, search index, Kafka

### 2.2 Deployment Topology
- Multi-tenant control plane in Kubernetes (EKS/GKE/AKS)
- Dedicated sandbox worker pools (Firecracker or gVisor)
- Object storage for snapshots/checkpoints/artifacts
- Regional deployments for data residency

### 2.3 Runtime Flows (must document sequence diagrams)
1. Tab completion request lifecycle
2. Inline edit + diff apply lifecycle
3. Agent task lifecycle (plan → tools → patch → verify → PR)
4. Cloud automation webhook-to-agent flow
5. Collaboration sync + conflict resolution
6. Privacy mode request path (no-retain)

---

## 3) Tech Stack (Prescriptive)

### Frontend
- Next.js (App Router), React, TypeScript
- Monaco editor + custom extensions
- Zustand (UI state) + TanStack Query (server state)
- Yjs + y-websocket (CRDT), optional WebRTC
- Tailwind + Radix UI
- xterm.js terminal, diff viewers

### Backend
- API/BFF + core services: NestJS or FastAPI
- High-perf sandbox supervisor + streaming multiplexer: Go
- Message/event bus: Kafka (or NATS if simplified)
- Background jobs: Temporal or BullMQ

### Data
- PostgreSQL (OLTP)
- Redis (cache/session/pubsub/queues)
- S3-compatible object storage (snapshots/artifacts)
- Qdrant/Weaviate (vectors)
- OpenSearch/Elasticsearch (grep/search)

### AI Layer
- Provider abstraction + routing policies
- Prompt registry/versioning
- Guardrails/policy engine
- Tool-calling DSL and execution traces

### Infra/DevOps
- Docker + Kubernetes + Helm
- GitHub Actions CI/CD
- OpenTelemetry, Prometheus, Grafana, Loki
- Secrets via AWS KMS/GCP KMS + Vault

---

## 4) Data Model (DDL-Level Specification)
Define all tables with PK/FK, indexes, constraints, audit columns.

### 4.1 Identity & Org
- `users(id, email, password_hash, status, mfa_enabled, created_at, updated_at)`
- `organizations(id, name, slug, plan_tier, data_region, privacy_mode_default, created_at, updated_at)`
- `teams(id, org_id, name, created_at, updated_at)`
- `memberships(id, org_id, team_id nullable, user_id, role enum[owner,admin,member,viewer], created_at)`
- `api_keys(id, owner_type, owner_id, key_hash, scopes jsonb, last_used_at, revoked_at)`
- `sso_configs(id, org_id, provider, saml_metadata, scim_enabled, jit_enabled)`

### 4.2 Workspaces & Repos
- `repositories(id, org_id, provider, external_id, url, default_branch, blocklisted bool)`
- `workspaces(id, org_id, repo_id, name, multi_root bool, settings jsonb)`
- `workspace_roots(id, workspace_id, repo_id, root_path)`
- `files(id, workspace_id, path, blob_ref, size_bytes, checksum, updated_by)`
- `git_worktrees(id, workspace_id, task_id nullable, branch, path, status)`
- `commits(id, workspace_id, sha, message, author_id, committed_at)`

### 4.3 AI Interactions
- `chat_threads(id, workspace_id, user_id, title, mode enum[chat,agent,composer], created_at)`
- `chat_messages(id, thread_id, role, content, citations jsonb, token_in, token_out, created_at)`
- `completions(id, workspace_id, user_id, file_path, cursor_pos, suggestion, accepted bool, latency_ms)`
- `inline_edits(id, workspace_id, user_id, prompt, target_files jsonb, patch, status, created_at)`
- `model_endpoints(id, org_id nullable, name, provider, base_url, model_id, auth_ref, capabilities jsonb, enabled)`

### 4.4 Agent Runtime
- `agent_tasks(id, org_id, workspace_id, created_by, mode, objective, autonomy_level, status, priority, created_at)`
- `agent_executions(id, task_id, agent_slot, sandbox_id, status, started_at, ended_at, exit_reason)`
- `agent_steps(id, execution_id, step_no, type, input jsonb, output jsonb, started_at, ended_at)`
- `tool_calls(id, execution_id, step_id, tool_name, request jsonb, response jsonb, status, duration_ms)`
- `checkpoints(id, execution_id, snapshot_ref, diff_ref, metadata jsonb, created_at)`
- `file_diffs(id, execution_id, file_path, patch, applied bool, reviewed_by)`

### 4.5 Search/Indexing
- `index_jobs(id, workspace_id, job_type, status, started_at, ended_at, metrics jsonb)`
- `code_symbols(id, workspace_id, file_path, symbol, kind, signature, location jsonb)`
- `ast_edges(id, workspace_id, src_symbol_id, dst_symbol_id, edge_type)`
- `vector_chunks(id, workspace_id, file_path, chunk_hash, embedding vector, metadata jsonb)`

### 4.6 Collaboration
- `collab_sessions(id, workspace_id, started_by, started_at, ended_at)`
- `presence_states(id, session_id, user_id, cursor jsonb, active_file, updated_at)`
- `comments(id, workspace_id, file_path, line_no, author_id, body, resolved_at)`
- `comment_threads(id, comment_id, parent_id nullable, author_id, body, created_at)`

### 4.7 Plugins/Marketplace
- `plugins(id, org_id nullable, name, version, type, manifest jsonb, signing_cert, status)`
- `plugin_installs(id, plugin_id, org_id, workspace_id nullable, enabled, settings jsonb)`
- `mcp_servers(id, org_id, name, endpoint, auth_type, auth_ref, scopes jsonb)`
- `skills(id, org_id nullable, name, spec jsonb, version, visibility)`
- `hooks(id, org_id, event, config jsonb, enabled)`
- `rules(id, org_id, scope, expression, severity, enabled)`
- `subagents(id, org_id, name, goal, tool_profile jsonb, constraints jsonb)`

### 4.8 Integrations/Automation
- `integration_accounts(id, org_id, provider, external_workspace_id, auth_ref, status)`
- `webhooks(id, org_id, provider, secret_ref, events jsonb, enabled)`
- `automation_workflows(id, org_id, name, trigger_type, trigger_config jsonb, action_config jsonb, enabled)`
- `automation_runs(id, workflow_id, trigger_payload jsonb, status, started_at, ended_at)`

### 4.9 Billing/Usage
- `plans(id, code, name, monthly_price_cents, limits jsonb)`
- `subscriptions(id, org_id, plan_id, status, seats, period_start, period_end, stripe_ref)`
- `usage_meters(id, org_id, meter_type, quantity, period_start, period_end)`
- `billing_events(id, org_id, source, payload jsonb, occurred_at)`
- `invoices(id, org_id, amount_cents, currency, status, due_at, paid_at)`

### 4.10 Security/Audit/Analytics
- `audit_logs(id, org_id, actor_id, action, resource_type, resource_id, ip, ua, metadata jsonb, created_at)`
- `security_events(id, org_id, type, severity, payload jsonb, created_at)`
- `analytics_events(id, org_id, user_id, event_name, properties jsonb, ts)`
- `privacy_requests(id, org_id, user_id, request_type, status, completed_at)`

---

## 5) API Contract (REST + WS + gRPC)
Version all APIs under `/v1` and publish OpenAPI + protobuf specs.

### 5.1 Auth & Identity
- `POST /v1/auth/signup`
- `POST /v1/auth/login`
- `POST /v1/auth/logout`
- `POST /v1/auth/refresh`
- `POST /v1/auth/mfa/verify`
- `GET /v1/auth/sso/:orgSlug/start`
- `POST /v1/auth/sso/:orgSlug/callback`
- `POST /v1/scim/v2/Users`

### 5.2 Org/Admin
- `GET /v1/orgs/:orgId`
- `PATCH /v1/orgs/:orgId/policies`
- `POST /v1/orgs/:orgId/members`
- `PATCH /v1/orgs/:orgId/members/:memberId`
- `GET /v1/orgs/:orgId/audit-logs`
- `GET /v1/orgs/:orgId/analytics`

### 5.3 Workspace/Git
- `POST /v1/workspaces`
- `GET /v1/workspaces/:id`
- `POST /v1/workspaces/:id/files/read`
- `POST /v1/workspaces/:id/files/write`
- `POST /v1/workspaces/:id/search/grep`
- `POST /v1/workspaces/:id/search/semantic`
- `POST /v1/workspaces/:id/git/worktrees`
- `POST /v1/workspaces/:id/git/commit`
- `POST /v1/workspaces/:id/git/push`

### 5.4 AI
- `POST /v1/ai/completions/tab` (stream)
- `POST /v1/ai/inline-edit` (returns patch + diagnostics)
- `POST /v1/ai/chat` (stream)
- `POST /v1/ai/chat/apply`
- `POST /v1/ai/composer/run`
- `GET /v1/ai/models`
- `POST /v1/ai/models/test`

### 5.5 Agents
- `POST /v1/agents/tasks`
- `GET /v1/agents/tasks/:taskId`
- `POST /v1/agents/tasks/:taskId/cancel`
- `GET /v1/agents/tasks/:taskId/executions`
- `POST /v1/agents/tasks/:taskId/checkpoints/:checkpointId/restore`
- `POST /v1/agents/cloud/launch`
- `POST /v1/agents/cloud/stop`

### 5.6 Integrations/Marketplace
- `POST /v1/integrations/slack/connect`
- `POST /v1/integrations/github/connect`
- `POST /v1/integrations/gitlab/connect`
- `POST /v1/integrations/linear/connect`
- `POST /v1/integrations/:provider/webhook`
- `GET /v1/plugins/marketplace`
- `POST /v1/plugins/install`
- `POST /v1/mcp/servers`

### 5.7 Billing
- `GET /v1/billing/plans`
- `POST /v1/billing/checkout`
- `POST /v1/billing/portal`
- `GET /v1/billing/usage`
- `GET /v1/billing/invoices`

### 5.8 Realtime (WebSocket channels)
- `/ws/collab` (presence, cursors, CRDT updates)
- `/ws/ai` (token streams, tool logs)
- `/ws/agents` (state updates, terminal output, patch stream)
- `/ws/notifications`

### 5.9 Internal gRPC
- Orchestrator ↔ Sandbox supervisor
- Indexer ↔ Parse workers
- Integrations dispatcher ↔ automation engine

---

## 6) Frontend Information Architecture

### 6.1 Component Tree
- `AppShell`
  - `TopBar`
  - `ActivitySidebar`
  - `ExplorerPanel`
  - `SearchPanel`
  - `SourceControlPanel`
  - `ChatPanel`
  - `AgentPanel`
  - `AgentsGridPanel` (up to 8)
  - `EditorArea`
    - `Tabs`
    - `MonacoHost`
    - `DiffView`
    - `InlineEditWidget`
    - `TabSuggestionGhostText`
  - `TerminalPanel`
  - `ProblemsPanel`
  - `CanvasesPanel`
  - `DesignModePanel`
  - `MissionControlOverlay`
  - `StatusBar`

### 6.2 State Strategy
- UI/session state: Zustand slices (layout, keybinds, mission control, selected agent)
- Server/cache state: TanStack Query
- CRDT doc state: Yjs docs + awareness
- Streaming states: RxJS or event emitter channels for AI/agent streams
- Feature flags/config: remote-config service

### 6.3 Key UX Behaviors
- Keyboard-first commands (Cmd/Ctrl+I/K/L)
- Diff accept/reject chunk granularity
- One-click "Instant Apply" with undo checkpoints
- Mentions autocomplete for contexts (`@Codebase` etc.)
- Mission Control live thumbnails from editor sessions

---

## 7) Agent Execution Engine (Control + Data Plane)

### 7.1 Agent State Machine
`QUEUED -> PLANNING -> EXECUTING -> VERIFYING -> PATCH_READY -> AWAIT_REVIEW/APPLYING -> COMPLETE/FAILED/CANCELLED`

### 7.2 Sandbox Design
- Per execution sandbox (Firecracker VM preferred)
- Mounted ephemeral workspace clone + optional persisted cache layer
- Tools exposed via capability broker:
  - file read/write
  - shell exec (policy filtered)
  - browser automation (Playwright)
  - git ops
  - HTTP fetch (policy controlled)
  - canvas renderer
- Egress policies by org + task labels

### 7.3 Multi-Agent / Worktree Isolation
- Each parallel agent gets dedicated worktree + branch
- Merge orchestration service handles conflict analysis + rebase strategy
- UI tiled panes subscribe independently to agent streams

### 7.4 Reliability
- Heartbeats + watchdogs for hung executions
- Checkpointing before risky operations
- Automatic retries on transient provider/tool errors
- Deterministic replay logs for incident triage

---

## 8) Collaboration Engine
- Yjs documents per file + awareness for cursors/selections
- Server-side persistence of CRDT updates for recovery
- Comment threads anchored by file path + line + range hash
- Conflict handling:
  - CRDT resolves text merges
  - semantic patch conflicts surfaced as structured diff
- Presence scaling with Redis pub/sub sharding

---

## 9) Search, Indexing, and Knowledge Graph
- Incremental indexer on file events + scheduled full reindex
- Tree-sitter parsers for symbols/AST edges
- Embedding pipeline for chunked semantic retrieval
- Reranker model for precision in long codebases
- Instant grep via OpenSearch with file/path filters and regex safety

---

## 10) Plugin/MCP/Skills/Subagents Platform
- Signed plugin manifests with permission scopes
- Plugin runtime sandbox and rate limits
- MCP registry with health checks and auth secrets
- Skills as versioned declarative workflows
- Hooks on key events (commit opened, PR created, task started, deploy failed)
- Subagents with constrained tool profiles and budget caps

---

## 11) Security, Privacy, and Compliance Controls

### 11.1 Security Controls
- OIDC/SAML SSO, SCIM provisioning, MFA
- RBAC + optional ABAC policy engine
- Workspace trust model + command allow/deny patterns
- Secrets redaction in logs/streams
- Encryption at rest (AES-256) + in transit (TLS 1.2+)

### 11.2 Privacy Mode
- Per-org and per-workspace no-retention toggle
- Disable prompt/content persistence and training usage
- Minimal transient logs with strict TTL and scrub pipeline

### 11.3 Compliance Readiness
- SOC 2 controls mapped to services
- GDPR/CCPA data subject workflows (export/delete)
- Immutable audit log retention policy
- Regional data residency routing

---

## 12) Billing, Entitlements, and Metering
- Feature gates by plan tier (tab limits, agent concurrency, cloud agent minutes, model access)
- Real-time metering by tokens/tool minutes/execution minutes/storage
- Hard/soft limit enforcement + grace windows
- Stripe integration for checkout, invoices, seat billing, proration
- Enterprise pooled credits and department-level chargeback tags

---

## 13) Observability and Operations
- OpenTelemetry traces for every request + agent step
- Structured logs with correlation IDs
- Metrics:
  - p50/p95 completion latency
  - acceptance rate of suggestions
  - agent success rate
  - sandbox startup latency
  - collaboration fanout lag
- SLOs and alert rules
- Runbooks for incident classes (provider outage, sandbox outage, webhook storm)

---

## 14) Deployment and Scalability Plan
- Environments: dev/stage/prod with infra-as-code
- Blue/green or canary releases
- Autoscaling policies:
  - API pods by CPU/RPS
  - sandbox pool by queue depth
  - websocket shards by connection count
- Postgres HA + read replicas
- Redis cluster mode
- Object lifecycle policies for artifacts/checkpoints
- Disaster recovery: cross-region backups + RPO/RTO targets

---

## 15) CLI and ACP Specifications

### CLI
- Install script + package manager distribution
- Auth via device code / API key
- Interactive mode with streaming
- Non-interactive mode for CI
- Slash commands: `/debug`, `/btw`, `/config`, `/statusline`
- Local repo context ingestion + remote execution option

### ACP (Agent Client Protocol)
- JSON-RPC over stdio/websocket
- Methods:
  - `acp.session.start`
  - `acp.context.update`
  - `acp.agent.run`
  - `acp.patch.preview`
  - `acp.patch.apply`
  - `acp.telemetry.emit`
- Capability negotiation and versioning

---

## 16) Integration Blueprints
- **GitHub/GitLab**: app installation, webhook verification, PR review bot, autofix branch + PR
- **Slack**: slash commands, mentions, threaded agent updates, approval actions
- **Linear**: issue ingest, assignment, status sync
- **Vercel/Cloudflare/AWS/Datadog/Stripe/Figma** via plugin connectors
- Idempotent webhook processing with signature validation and replay protection

---

## 17) QA, Test Strategy, and Acceptance Criteria
- Unit tests for services and policy engine
- Integration tests for API contracts and provider routing
- E2E tests for editor flows (tab/inline/chat/agent)
- Sandbox tests (command policy, network isolation, artifact output)
- Load tests:
  - 10k concurrent WS connections
  - 1k concurrent agent tasks
- Security tests: SAST/DAST, dependency scanning, secrets scanning
- Compliance evidence collection automation

---

## 18) Implementation Roadmap (Phased)

### Phase 1: Core IDE + Basic AI
- Auth, orgs, workspace files, Monaco shell
- Chat + Tab completion + inline edit MVP
- Basic usage metering

### Phase 2: Agent Core
- Agent orchestrator, sandbox runner, tool-calling, patches/checkpoints
- Terminal panel + diff apply pipeline

### Phase 3: Collaboration + Search
- Yjs realtime editing + comments
- Indexing pipeline + grep + semantic search

### Phase 4: Integrations + Marketplace
- GitHub/Slack/Linear integrations
- Plugin/MCP/skills/hooks/subagents foundation

### Phase 5: Enterprise
- SSO/SCIM, admin policy center, audit, advanced analytics, pooled billing

### Phase 6: Advanced UX
- Multi-agent tiled mission control, canvases, design mode, voice input
- ACP + external IDE adapters (JetBrains/Xcode)

### Phase 7: Hardening
- Performance tuning, chaos testing, DR drills, SOC2 readiness completion

---

## 19) Non-Functional Requirements (Must Meet)
- API p95 < 250ms (non-AI endpoints)
- Tab suggestion initial token p95 < 450ms
- Agent sandbox boot p95 < 8s (prewarmed path < 3s)
- 99.9% monthly uptime for control plane
- Tenant isolation with strict authz boundaries
- Full auditability for admin/security-critical actions

---

## 20) Deliverables Required From Code Generator
1. Monorepo with service boundaries and shared contracts
2. IaC for full cloud deployment
3. DB migrations and seed scripts
4. OpenAPI/protobuf specs
5. Complete CI/CD pipelines
6. Test suites and synthetic load scripts
7. Admin and user docs
8. Security/compliance operational docs
9. Sample plugins/connectors and SDK stubs
10. Production runbooks and on-call handbook

Use this specification as the canonical contract. Do not omit any feature listed in sections A–J.
