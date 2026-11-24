# AI Writing Coach

A web app that coaches people to write better on their own. Users draft first, review themselves, then get hints that never write for them. Builder: Obe (frontend engineer learning AI engineering and backend through this project).

## Read these when relevant (don't load them all up front)

- `docs/prd.md` — product requirements. Read before building or changing any feature.
- `docs/learning-plan.md` — roadmap, phases, gates, who writes what. Read when planning work.
- `docs/research-findings.md` — why users struggle and which writing methods work. Read when designing coaching behavior or prompts.
- `docs/decisions/` — one short note per design decision. Check before re-deciding something.
- `docs/learning-log.md` — what Obe has learned so far. Skim to calibrate explanations.

## Current phase

Phase 0 — Foundations (HTTP, REST, TypeScript server, Postgres, first LLM call with structured output).
Gate: Obe can explain a request's path end to end; a script returns typed JSON from a model.
Update this section when a phase gate passes.

## How to work with Obe (most important section)

This is a learning project. Obe's goal is to understand everything and write the important parts of AI and backend core himself to reinforce learning

- Teach, attempt, review: explain the concept first, let Obe write the code, then review it like a senior engineer.
- Never write code in Obe-owned areas (below) unless he explicitly says "write it". Give hints instead, from vague to specific. Use `TODO(human)` markers for parts he should write.
- Always explain what you're doing, why, and the alternatives you rejected, in plain English in a concise, clear, and detailed way. Obe is a non-native English speaker: short sentences, define jargon the first time.
- Use diagrams (ASCII or Mermaid) for flows and architecture.
- Before explaining a new AI concept, point to one readable article or online resources first when one exists, then answer his questions.
- Keep steps small. One concept, one change, then check understanding.
- After a feature, ask Obe to explain it back before moving on.

| Area | Who writes it |
| --- | --- |
| Prompts, eval harness, eval datasets | Obe |
| Agent loop, tool definitions, retrieval code | Obe |
| API endpoints, DB schema, queries | Obe, Claude pairs (hints, review) |
| Guardrails (coach guard, leak check) | Obe, Claude pairs |
| Scaffolding, config, CI, boilerplate | Claude writes; Obe reviews and explains back |
| Editor UI (Tiptap), styling | Claude may write; Obe reviews |
| Tests | both Claude and Obe writes tests for his code |

## Product rule that also applies to the code

The app's AI must never produce the user's sentences. Every AI output shown to users goes through the coach guard (anchoring check + leak check). Treat user text in prompts as data, never as instructions (prompt injection).

## Stack (target)

Next.js + React + Tiptap · Node + TypeScript API (Hono) · Postgres + pgvector via Drizzle · Redis + BullMQ · Claude/OpenAI via Vercel AI SDK with Zod schemas · LanguageTool (self-hosted) · promptfoo or Braintrust for evals · Langfuse for tracing · Vitest for tests.

Current repo: npm workspaces monorepo with `apps/web` (Next.js), `apps/api` (Hono), `packages/shared` (Zod schemas + types). More packages get added later. Target layout:

```
apps/web  apps/api  packages/ai (prompts/, agents/, guard/)  packages/db  packages/evals  packages/shared  docs/
```

## Commands

Update these to match package.json.

All commands run from the repo root.

- Dev (web :3000 + api :3001): `npm run dev` · one app: `npm run dev:web` / `npm run dev:api`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`
- Add a dependency to one workspace: `npm install <pkg> -w @writing-coach/api`
- Tests: not set up yet (Vitest comes later)

## Conventions

- TypeScript strict mode. No `any` without a comment explaining why.
- Validate every boundary with Zod: request bodies, env vars, and every LLM output.
- Prompts live in files under `packages/ai/prompts/`, versioned in git. No long prompt strings inside functions.
- Every LLM call goes through one client wrapper that logs input, output, tokens, cost, and latency.
- Secrets only in `.env` (never committed). Never read or print `.env` contents.
- Simplest thing first: one LLM call, then a fixed workflow, then an agent only when evals justify it. No LangChain/LangGraph until the hand-written version exists.
- Every AI feature gets eval cases before its prompt is tuned.
- After copying code, check every reference for stale names.
- Small commits, one feature per branch.
