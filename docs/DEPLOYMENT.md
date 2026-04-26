# Deployment

## Local

`cp .env.example .env && docker compose up`

## Production (Kubernetes)

Build images from `infra/docker` and deploy manifests from `infra/k8s`.

## Cloudflare Workers (monorepo)

This repository is an npm workspace monorepo.

If Cloudflare's deploy command is set to `npx wrangler deploy` at the **repo root**, Wrangler fails with:

> The Wrangler application detection logic has been run in the root of a workspace instead of targeting a specific project.

### Correct Cloudflare project commands

Use workspace-aware commands in Cloudflare:

- **Build command:** `npm run build`
- **Deploy command:** `npm run deploy`

`npm run deploy` delegates to `@apps/worker`, so Wrangler executes from an actual app workspace instead of the monorepo root.

### Local equivalent

```bash
npm run deploy
```

Avoid running this from the repo root:

```bash
npx wrangler deploy
```
