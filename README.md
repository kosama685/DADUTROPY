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
