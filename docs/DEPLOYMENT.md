# Deployment

Local: cp .env.example .env && docker compose up.
Production: build images from infra/docker and deploy infra/k8s manifests.