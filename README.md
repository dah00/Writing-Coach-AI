# AI Writing Coach

A web app that coaches people to write better on their own. You draft first and review your own work, then you get hints. The AI never writes your sentences for you.

> Status: early development (phase 0, foundations). Not usable yet.

## Why

Grammar correctors fix your mistakes without teaching you anything. Chatbots rewrite your whole text, so your skills never improve. This coach does the opposite: it holds back the answer, points at the problem, and lets you make the fix yourself. Read the full product requirements in [docs/prd.md](docs/prd.md).

## Repo layout

This is a monorepo using npm workspaces.

```
apps/web         Next.js frontend (the editor)
apps/api         Hono API server (Node + TypeScript)
packages/shared  Code and Zod schemas used by both apps
docs/            Product requirements, learning plan, design decisions
```

## Getting started

Requires Node 24.

```bash
npm install
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:3001/health

## Scripts

| Command             | What it does                        |
| ------------------- | ----------------------------------- |
| `npm run dev`       | Starts the web app and API together |
| `npm run build`     | Builds every workspace              |
| `npm run lint`      | Lints every workspace               |
| `npm run typecheck` | Type-checks every workspace         |

## Docs

- [Product requirements](docs/prd.md)
- [Learning plan](docs/learning-plan.md)
- [Design decisions](docs/decisions/)
