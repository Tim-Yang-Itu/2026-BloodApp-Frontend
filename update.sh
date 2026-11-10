#!/usr/bin/env bash
# ============================================================
# Update frontend (pull image dari Docker Hub).
#
#   ./update.sh
#
# Alur: pull image terbaru -> recreate container (tanpa build).
# Image di-build & di-push dari lokal, jadi script ini TIDAK build.
# ============================================================

set -euo pipefail

cd "$(dirname "$0")"

COMPOSE_FILE=docker-compose.donorku.yml

echo "==> Pull image terbaru..."
docker compose -f "$COMPOSE_FILE" pull

echo "==> Recreate container..."
docker compose -f "$COMPOSE_FILE" up -d

echo "==> Bersihkan image lama (dangling)..."
docker image prune -f

echo "==> Status:"
docker compose -f "$COMPOSE_FILE" ps

echo "Selesai."
