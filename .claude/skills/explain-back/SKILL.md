---
name: explain-back
description: Quiz Obe on a feature or change he just built to check he understands what, why, and how, then log the result. Use after a feature is finished or when Obe types /explain-back.
argument-hint: <feature or change>
---

Check Obe's understanding of: $ARGUMENTS (if empty, use the most recent change in `git diff` or `git log -1`).

1. Ask him to explain, in his own words and in this order (one question at a time, wait for each answer):
   - **What** does this code do? Walk through a request or data flow from start to end.
   - **Why** is it built this way? What alternative did we reject, and why?
   - **How** would it fail? Name one failure case and how the code handles it (or doesn't).
2. After each answer: say what was right, then correct or deepen anything missing. Be encouraging and specific.
3. Ask one "what if" follow-up that pushes slightly beyond what he built (e.g., "what if 1,000 users did this at once?").
4. End with a short summary: what he clearly understands, and one gap to study next.
5. Append an entry to `docs/learning-log.md` in this format (show it to Obe first):

```
## <date> — <feature>
- Understood: ...
- Gap to study: ...
- Confused me: ...
```

Never answer the questions for him before he tries.
