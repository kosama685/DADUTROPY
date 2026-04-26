# AI Dev Platform

Clean-room, original monorepo for a web-based AI-native development platform.

## Quick start
1. `cp .env.example .env`
2. `npm install`
3. `docker compose up -d postgres redis minio`
4. `npm run db:generate`
5. `npm run db:migrate`
6. `npm run db:seed`
7. `npm run dev`

## Database used by the API
- **Primary DB:** PostgreSQL (via Prisma ORM).
- **Configured in:** `packages/db/prisma/schema.prisma` (`provider = "postgresql"`).
- **Connection string env var:** `DATABASE_URL` in `.env` (example: `postgresql://postgres:postgres@localhost:5432/ai_dev_platform`).

## API route debugging notes
- `GET /` now returns an API landing payload instead of a 404.
- `GET /routes` returns a list of supported endpoints.
- `GET /health` now also verifies database connectivity (runs `SELECT 1`) and reports `database: "postgresql"`.
- Unknown routes return a helpful 404 with a hint to check `GET /routes`.

## API setup + complete curl checks
Start dependencies and API:
```bash
cp .env.example .env
npm install
docker compose up -d postgres redis minio
npm run db:generate
npm run db:migrate
npm run db:seed
npm --workspace @apps/api run dev
```

In another terminal, run all route checks:
```bash
BASE_URL=http://localhost:4000

curl -sS "$BASE_URL/"
curl -sS "$BASE_URL/routes"
curl -sS "$BASE_URL/health"
curl -sS "$BASE_URL/users?page=1&pageSize=5"
curl -sS "$BASE_URL/organizations"
curl -sS "$BASE_URL/projects"
curl -sS "$BASE_URL/repositories"
curl -sS "$BASE_URL/chat/conversations"
curl -sS "$BASE_URL/agents"
curl -sS "$BASE_URL/cloud-agents"
curl -sS "$BASE_URL/reviews"
curl -sS "$BASE_URL/automations"
curl -sS "$BASE_URL/rules"
curl -sS "$BASE_URL/skills"
curl -sS "$BASE_URL/hooks"
curl -sS "$BASE_URL/plugins"
curl -sS "$BASE_URL/tools"
curl -sS "$BASE_URL/integrations"
curl -sS "$BASE_URL/models"
curl -sS "$BASE_URL/usage"
curl -sS "$BASE_URL/billing"
curl -sS "$BASE_URL/audit-logs"
curl -sS "$BASE_URL/notifications"
curl -sS "$BASE_URL/admin/overview"
curl -sS "$BASE_URL/api-keys"
curl -sS "$BASE_URL/service-accounts"

curl -sS -X POST "$BASE_URL/auth/login" \
  -H "content-type: application/json" \
  -d '{"email":"dev@example.com","password":"Password123!"}'

curl -sS -X POST "$BASE_URL/webhooks/stripe"
```

## Seeded users
- superadmin@example.com / Password123!
- owner@example.com / Password123!
- admin@example.com / Password123!
- dev@example.com / Password123!
- viewer@example.com / Password123!

## Commands
- Install: `npm install`
- Run stack: `docker compose up`
- Migrate: `npm run db:migrate`
- Seed: `npm run db:seed`
- Test: `npm test`
- Build: `npm run build`
- Deploy: apply `infra/k8s/base.yaml`

## Documentation
- Architecture: `docs/ARCHITECTURE.md`
- API: `docs/API.md`
- Security: `docs/SECURITY.md`
- Deployment: `docs/DEPLOYMENT.md`
- Plugin development: `docs/PLUGIN_DEVELOPMENT.md`
- Admin guide: `docs/ADMIN.md`
- Cursor-style build prompt: `docs/AETHERCODE_CURSOR_CLONE_PROMPT.md`
