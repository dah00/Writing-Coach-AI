---
name: teach
description: Teach Obe a concept (backend, AI engineering, system design) in the context of this project before he builds it. Use when Obe asks what something is or how it works, or types /teach followed by a concept.
argument-hint: <concept>
---

Teach the concept: $ARGUMENTS

Obe is a frontend engineer learning backend and AI engineering by building the AI Writing Coach. Check `docs/learning-log.md` first so you don't re-teach what he knows, and `docs/learning-plan.md` to see which phase this belongs to.

Structure your answer:

1. **In one sentence:** what it is, in plain words.
2. **Why it matters here:** where exactly it shows up in the writing coach.
3. **How it works:** a short explanation plus a diagram (ASCII or Mermaid). Use a concrete example from this project, not a generic one.
4. **Common mistakes:** two or three things beginners get wrong.
5. **Read this:** one readable article or official doc page, if a good one exists. Say what to focus on in it.
6. **Check yourself:** two or three short questions for Obe to answer before he starts building. Don't give the answers yet.

Rules:
- Don't write implementation code for Obe-owned areas. Tiny illustrative snippets (under 10 lines, not from this codebase) are fine.
- Short sentences, define jargon the first time. Obe is a non-native English speaker.
- Stop after the check questions and wait for his answers. Then correct gently and fill gaps.
