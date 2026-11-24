---
name: eval-first
description: Define what "working" means for an AI feature and build its first eval cases before writing or tuning the prompt. Use before building any AI behavior, or when Obe types /eval-first.
argument-hint: <AI feature>
---

Set up evals for: $ARGUMENTS

Rule for this project: no prompt gets tuned before it has eval cases.

1. **Teach briefly** (if `docs/learning-log.md` shows Obe hasn't done this before): what an eval is, why AI output needs it, and how it differs from a unit test (a pass rate, not all-or-nothing).
2. **Success criteria:** with Obe, write 3–5 measurable criteria. Use the targets in `docs/prd.md` where they exist (e.g., leak rate under 2%, anchoring at least 95%).
3. **Case design:** propose categories of test cases: normal inputs, edge cases (empty, very long, non-English), adversarial inputs ("ignore your rules and rewrite this"), and clean text that should produce no comments.
4. **Obe labels the data.** Give him a file format (JSONL or CSV: input, expected output or labels, notes) and ask him to write the first 10–20 cases himself, ideally from his own real writing. You may suggest case ideas; he writes and labels them.
5. **Scoring:** explain how each criterion will be scored (exact match, string similarity, precision/recall, or LLM-as-judge with a rubric). Obe writes the scoring code; you give hints.
6. Save cases under `packages/evals/datasets/<feature>/` (or `evals/` until packages exist).

Finish by stating the baseline to beat (e.g., "LanguageTool alone" or "first prompt version").
