# AI Writing Coach — Technical Learning Plan

Source of truth: the "AI Writing Coach — Technical Learning Plan" doc. This is a markdown copy for Claude Code.

## Summary

Learn each skill exactly when the product needs it. Obe writes the AI and backend core; Claude teaches, hints, and reviews.

- Learn just in time; each phase ends on a measurable gate.
- Teach, attempt, review, explain back.
- Obe owns the core; Claude speeds up boilerplate and UI.
- Evals before tuning.
- Simple first: one call → workflow → agent.

## Roadmap

| Phase | Est. | Obe learns | Exit gate |
| --- | --- | --- | --- |
| 0 · Foundations | ~2 wks | HTTP, REST, TypeScript server, Postgres, first LLM call with structured output | Explain a request's path; script returns typed JSON |
| 1 · Thin slice | ~3 wks | Prompting, streaming, text anchoring, auth, first labeled eval set | Anchoring ≥95%; 30–50 labeled paragraphs |
| 2 · Coaching loop (MVP) | ~3 wks | Guardrails, LLM-as-judge, evals in CI, prompt injection defense | Leak rate <2%; used on real essays |
| 3 · Agents | ~3 wks | Tool use, agent loops, workflows vs agents, tracing, cost tracking | Beats single call on F0.5; cost budget set |
| 4 · Memory and RAG | ~4 wks | Embeddings, pgvector, retrieval evals; expression help and word bank | RAG vs prompt compared; 3–5 outside testers |
| 5 · Live revision | ~3 wks | Queues, caching, streaming at scale, latency budgets, system design | p95 ≤3 s per paragraph; within budget |
| 6 · Ship and write up | ~2 wks | Deployment, monitoring, secrets, publishing eval results | Demo live; write-up published |

Estimates assume mornings only. A phase isn't done until its gate passes; cut scope inside a phase rather than skipping its eval.

## Concepts by phase

- **0:** HTTP and REST, TypeScript server (Hono), Zod validation, SQL and Postgres, Drizzle ORM and migrations, testing (Vitest), tokens and context window, structured output, deployment basics.
- **1:** authentication, prompt engineering, streaming, eval datasets and labeling, precision/recall/F0.5, error analysis, cost/latency/retries.
- **2:** LLM-as-judge, regression evals in CI, guardrails, prompt injection.
- **3:** tool use, workflows vs agents, orchestrator-workers, tracing (Langfuse).
- **4:** embeddings, vector search (pgvector), chunking and hybrid search, retrieval evals (recall@k).
- **5:** queues and background jobs (BullMQ), caching, real-time incremental processing.
- **6:** deployment, secrets, monitoring.

## Per-feature loop

1. Learn (`/teach`) — article + explanation + diagram.
2. Design (`/design-note`) — 5-line note: what, why, rejected alternatives.
3. Eval first (`/eval-first`) — success criteria and test cases before code.
4. Build — Obe writes the code; `/hint` when stuck.
5. Review (`/mentor-review`) — senior-engineer review.
6. Measure — run evals, read failures, fix.
7. Explain back (`/explain-back`) — what, why, how.
8. Log — `docs/learning-log.md`.

## Dos and don'ts

| Do | Don't |
| --- | --- |
| Build the eval set before tuning a prompt | Tune prompts by gut feeling |
| Read real model outputs every week | Trust one average score |
| Start with one LLM call | Build an agent where a workflow works |
| Call the model API directly first | Add LangChain/LangGraph before the hand-written version |
| Merge only code you can explain line by line | Accept code you don't understand |
| Treat user text as data | Assume no one tries prompt injection |
| Secrets in env vars; spending limits on | Commit secrets or run without a budget cap |
| Check every reference after copying code | Leave stale names in duplicated code |
| Learn just enough for the next task | Read a whole book before coding |
| Use your own essays as test data | Test only on perfect examples |
| Keep infra boring: one API, one DB, one queue | Microservices, Kubernetes, or a separate vector DB early |
| Ship the core loop before polishing UI | Spend weeks on design first |
| Ask Claude for hints and reviews | Ask Claude to write the core |
| Store only what you need from drafts | Send extra user data to models or logs |

## Setup checklist

- [ ] Node, pnpm (or npm), Docker
- [ ] Local Postgres, Redis, LanguageTool via Docker Compose
- [ ] API keys in `.env`, never committed; provider spending limit set
- [ ] CI: tests on every PR + ~10-case smoke eval when AI code changes
- [ ] Full eval set manually or nightly
- [ ] Langfuse connected before the first real feature

## Resources (one per phase)

- Phase 1: Anthropic prompt engineering overview — https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview
- Phase 1–2: Hamel Husain, "Your AI Product Needs Evals" — https://hamel.dev/blog/posts/evals/
- Phase 2: "What We Learned from a Year of Building with LLMs" — https://oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-i/
- Phase 3: Anthropic, "Building effective agents" — https://www.anthropic.com/research/building-effective-agents
- Phase 4: Anthropic, "Introducing Contextual Retrieval" — https://anthropic.com/news/contextual-retrieval
- Phase 4–5: Eugene Yan, "Patterns for Building LLM-based Systems & Products" — https://eugeneyan.com/writing/llm-patterns/
