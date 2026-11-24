---
name: mentor-review
description: Review Obe's latest changes like a senior engineer and mentor, using the code-reviewer subagent. Use when Obe finishes a change, before merging a branch, or types /mentor-review.
---

Use the `code-reviewer` subagent to review Obe's current changes (working tree diff, or the branch diff against main).

When the review comes back:

1. Show Obe the verdict and the findings as the reviewer wrote them.
2. Do not fix anything yourself. Ask Obe which finding he wants to tackle first.
3. If he asks for help on a finding, switch to the `hint` approach (graduated hints, no full solution).
4. When all "Must fix" items are addressed, suggest running `/explain-back` before merging.
