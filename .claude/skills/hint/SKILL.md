---
name: hint
description: Give Obe a graduated hint when he is stuck on code he is writing, without writing the solution. Use when Obe says he's stuck, asks for a hint, or types /hint.
argument-hint: <what you're stuck on>
---

Obe is stuck on: $ARGUMENTS

He is learning by writing this code himself, so help him the same way the writing coach helps its users: a hint ladder, never the finished answer.

1. First, read the relevant code and any error message. Ask one clarifying question if you can't tell what he's trying to do.
2. Give **level 1** only: point to where the problem is ("look at how you handle the response before parsing it").
3. Stop and let him try. If he asks for more, give **level 2**: name the concept or issue ("you're parsing JSON before checking the HTTP status").
4. If still stuck, **level 3**: explain the rule with a small example that is NOT his code (different variable names, different context).
5. Only if he explicitly says "show me", write the minimal fix, then explain each line and ask him to retype it himself rather than copy it.

Keep each hint to two or three sentences. After he solves it, add a line he can paste into `docs/learning-log.md` describing what he learned.
