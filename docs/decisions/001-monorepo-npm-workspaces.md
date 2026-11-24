# 001 — Monorepo with npm workspaces

Date: 2026-11-23 · Status: accepted

## Context
The app needs a frontend (Next.js) and a separate API (Hono). Both must agree on request/response shapes. We want one repo, little tooling, and code that is easy to understand while learning.

## Options
| Option | Pros | Cons |
| --- | --- | --- |
| npm workspaces | Built into npm, no new tool, one lockfile | No task caching, no parallel runner (we use `concurrently` for dev) |
| pnpm workspaces | Faster, stricter dependency isolation | New tool to learn, Next/Turbopack setup slightly different |
| Turborepo / Nx on top | Caching, task graph | Extra concepts we don't need with 3 packages |
| API inside Next.js (route handlers) | One app, no monorepo | Backend tied to the frontend framework; misses the backend learning goal |

## Decision
npm workspaces: `apps/web`, `apps/api`, `packages/shared`. `packages/shared` exports TypeScript source directly (no build step). Turbopack and `tsx` compile it on the fly.

## Why (in Obe's words)
<!-- Obe: fill this in after reviewing the setup. -->

## Consequences
- Easier: one `npm install`, shared Zod schemas give type-safe contracts between web and api.
- Harder: `packages/shared` must not import Node-only or browser-only code, because both sides use it.
- Revisit when: builds get slow (add Turborepo), or we deploy the API and need compiled JS (add a build step).
