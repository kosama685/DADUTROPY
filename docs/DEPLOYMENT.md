# Deployment

## Local

`cp .env.example .env && docker compose up`

## Production (Kubernetes)

Build images from `infra/docker` and deploy manifests from `infra/k8s`.

## Cloudflare Workers (monorepo)

This repository is an npm workspace monorepo. Running `wrangler deploy` from the repo root will fail with:

> The Wrangler application detection logic has been run in the root of a workspace instead of targeting a specific project.

Use a workspace-scoped deploy command instead:

```bash
npm run deploy
```

That command delegates to `@apps/worker` so Wrangler runs from a concrete app workspace, not from the monorepo root.

Some CI/CD platforms invoke `npx wrangler versions upload` from the repo root.
A root `wrangler.jsonc` is included so this command resolves to the worker entrypoint (`apps/worker/src/main.ts`).

