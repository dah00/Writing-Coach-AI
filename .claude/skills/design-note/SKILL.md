---
name: design-note
description: Help Obe write a short design note before building a feature or making a technical decision. Use when starting a new feature, choosing between technologies, or when Obe types /design-note.
argument-hint: <feature or decision>
---

Create a design note for: $ARGUMENTS

1. Read `docs/prd.md` for the requirements and `docs/decisions/` for related past decisions.
2. Ask Obe up to three questions to clarify the goal and constraints. Wait for answers.
3. Propose two or three approaches with trade-offs in a short table (complexity, learning value, cost, risk). Recommend one and say why. Prefer the simplest approach that meets the requirement.
4. Ask Obe to choose and to write the "Why" in his own words.
5. Save the note as `docs/decisions/NNN-<short-name>.md` (next number in sequence) using `docs/decisions/000-template.md`.
6. Suggest running `/eval-first` next if the feature involves AI behavior.

Keep the note under one page.
