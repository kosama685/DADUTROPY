# AetherCode Cursor-Style Build Prompt (April 2026)

Copy everything inside the fenced code block below and paste it into your preferred coding model.

```text
You are the world's best full-stack AI engineer and AI-native product architect. Your mission is to build a **complete, production-ready, fully functional web-based AI code editor and autonomous agent platform** that replicates **EVERY SINGLE FEATURE** of Cursor.com (as of April 2026) described in the exhaustive feature document provided below.

Project name: **AetherCode** (a clean-room web-native Cursor alternative).

**GOAL**: Deliver a complete monorepo codebase that includes:
- Full web IDE (editor + all panels)
- Backend API + real-time services
- Admin dashboard + team/enterprise controls
- Complete RBAC roles and permissions
- Database schema + migrations
- AI agent orchestration (local + cloud)
- Semantic indexing + vector search
- All AI features (Tab, Composer, Agent, Ask, Plan, Debug, Max Mode, etc.)
- Web-based terminal, browser, canvases, worktrees
- MCP/ACP protocol support
- Bugbot + automations + integrations
- Everything listed in the attached Cursor documentation — no feature may be omitted or simplified.

**TECH STACK (use exactly this for maximum realism and maintainability):**
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + Monaco Editor (full VS Code web editor) + Zustand/Jotai + TanStack Query + WebSockets (Socket.io or tRPC)
- **Backend**: NestJS (Node.js) or FastAPI (Python) with TypeScript preference — modular monolith with clear service boundaries
- **Real-time**: Socket.io + Redis Pub/Sub
- **Database**: PostgreSQL + Prisma (or Drizzle) + pgvector for embeddings
- **Vector DB**: pgvector (or Qdrant if needed)
- **Auth**: NextAuth.js / Clerk + SSO-ready (SAML/OIDC stubs) + RBAC with Casbin or custom policy engine
- **File storage**: Local + S3-compatible (MinIO)
- **Background jobs/Cloud Agents**: BullMQ + Redis + Docker-in-Docker (or Firecracker microVMs) for sandboxed agents
- **AI integrations**: OpenAI, Anthropic, Gemini, Grok, xAI, custom models via OpenAI-compatible endpoints
- **Embedding model**: local or voyage-ai / text-embedding-3-large
- **Deployment-ready**: Docker Compose + Dockerfile for all services + Kubernetes manifests for cloud agents pool
- **Testing**: Vitest + Playwright + Jest

**PROJECT STRUCTURE** (create this exact monorepo layout):
/aethercode
├── apps/
│   ├── web/                  # Next.js web IDE + dashboard
│   ├── cli/                  # Web CLI equivalent (terminal + API)
│   └── agents-worker/        # Cloud agent execution service
├── packages/
│   ├── core/                 # Shared types, utils, AI orchestration
│   ├── ui/                   # shadcn + custom components
│   ├── agent-runtime/        # Agent loop, tools, MCP, hooks
│   ├── indexing/             # Semantic + grep indexing engine
│   ├── mcp/                  # Model Context Protocol server
│   └── rules-skills/         # Rules, skills, subagents engine
├── prisma/                   # DB schema
├── docker-compose.yml
├── README.md (with full setup + feature matrix)
└── turbo.json

**DEVELOPMENT INSTRUCTIONS**:
1. First, output the complete **architecture diagram** (Mermaid) + **database schema** (Prisma) + **RBAC roles matrix** (Admin, Owner, Member, Service Account, Guest).
2. Then build the project **modularly, one package/app at a time**, providing **complete, copy-paste-ready code** for each module with full TypeScript types, error handling, tests, and documentation.
3. After each major feature group, provide migration steps and how to test it.
4. Use modern best practices: clean architecture, dependency injection, event-driven design, comprehensive logging/observability, rate limiting, security (sandboxing, allowlists, secret redaction).

**EXHAUSTIVE FEATURE REQUIREMENTS** (implement 100% of these — treat this as the canonical spec):

[PASTE THE ENTIRE CONTENT OF THE ORIGINAL pasted-text.txt FILE HERE — the full feature list, reverse engineering insights, public docs inventory, architecture layers (Glass, Composer, Agent System), all sections A–T, pricing, enterprise controls, CLI commands, MCP, canvases, worktrees, Bugbot, automations, integrations (Slack, GitHub, Linear, etc.), Privacy Mode, audit logs, analytics dashboard, etc.]

Key non-negotiable capabilities to implement exactly as described:
- Web Monaco Editor with full VS Code parity + AI-native extensions (Tab autocomplete with smart rewrites, Cmd+K inline edit with diff preview, Cmd+L chat, Cmd+I Agent, Composer with autonomy slider)
- Full Agent Mode with multi-agent parallel execution (up to 8), tiled layout, worktrees, subagents, checkpoints
- Cloud Agents (Docker sandbox + browser + terminal + computer use) accessible via web UI
- Semantic + Instant Grep codebase indexing with .aetherignore support
- Rules, Skills, Subagents, Hooks, Plugins/MCP system with marketplace stub
- Canvases (interactive React dashboards rendered in side panel)
- Bugbot + Agent Review + PR automation
- Web-based terminal (xterm.js) with sandbox + auto-run controls
- Integrated browser tool for agents
- Team dashboard + admin controls + analytics + audit logs + billing groups
- Full RBAC + SSO-ready + SCIM stubs
- CLI API endpoint that mirrors all Cursor CLI commands (/plan, /debug, /btw, etc.)
- Privacy Mode, zero data retention paths, secret redaction
- All keyboard shortcuts, diff views, plan mode, debug mode, Max Mode, voice input stub
- Git integration, commit attribution, Cursor Blame equivalent
- Everything else in the document — do not omit any feature.

**ETHICAL & TECHNICAL NOTES**:
- This is a clean-room implementation for educational and competitive purposes. Do not copy any proprietary Cursor code, prompts, or assets.
- Make the system self-hostable and open-source friendly.
- Include comprehensive README with setup instructions, environment variables, and feature-completion checklist.
- Prioritize security and sandboxing everywhere (especially terminal, MCP, cloud agents).

Begin now. Start by outputting:
1. Full monorepo structure with all files listed.
2. Prisma schema + RBAC model.
3. High-level architecture diagram (Mermaid).
4. Then proceed to implement the core web app first (editor + basic chat), then layer on AI features, agents, backend services, dashboard, etc.

Build the **complete** product. I will iterate with you after each major section.
```

## Usage

1. Open your coding model of choice.
2. Paste this prompt.
3. Append your `pasted-text.txt` full feature spec.
4. Iterate by asking for implementation in milestone batches.
