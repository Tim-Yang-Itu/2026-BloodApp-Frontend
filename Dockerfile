# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────
# DarahTerpadu — React 19 + TypeScript + Vite (SPA)
# Multi-stage: deps → build → nginx runtime
# ─────────────────────────────────────────────────────────────

ARG NODE_VERSION=22-alpine
ARG NGINX_VERSION=stable-alpine

# ---------- 1. dependencies ----------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Only manifests first → layer cache survives source changes
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---------- 2. build ----------
FROM node:${NODE_VERSION} AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# `npm run build` = tsc -b && vite build  →  /app/dist
# Aplikasi UI-only: tidak ada VITE_* / .env yang perlu di-inject.
ENV NODE_ENV=production
RUN npm run build

# ---------- 3. runtime ----------
FROM nginx:${NGINX_VERSION} AS runtime

LABEL org.opencontainers.image.title="Blood App Frontend" \
      org.opencontainers.image.description="DarahTerpadu donor darah SPA (React + Vite) served by nginx" \
      org.opencontainers.image.licenses="UNLICENSED"

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
