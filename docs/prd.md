# AI Writing Coach — Product Requirements

Source of truth: the "AI Writing Coach — Product Requirements" doc. This is a markdown copy for Claude Code; update both when requirements change.

## Overview

An AI writing coach that teaches people to write better on their own: draft first, review yourself, then get hints that never write for you.

- **Problem:** many people, especially non-native English speakers, spend hours on short pieces and repeat the same mistakes for years. Correctors (Grammarly, LanguageTool) fix errors without teaching. Chatbots rewrite everything, so skill never grows.
- **Bet:** a coach that holds back the answer, remembers each writer's patterns, and works on planning and structure will make people faster and better writers.
- **Also a learning project:** AI is the core, so it requires real evals, agents, RAG, and real-time system design. The builder is user #1.

## Goals and non-goals

Product goals:
1. Cut the time to finish a short piece without lowering quality.
2. Reduce each writer's recurring errors over weeks.
3. The writer does every fix. The AI points, names, explains, and verifies.

Non-goals for now: generating or rewriting user text ("make it sound better"), plagiarism/AI detection, classrooms/teacher dashboards, languages other than English (French later), mobile apps, spoken practice.

## Target users

| Persona | Situation | Needs most |
| --- | --- | --- |
| Non-native student (primary) | College essays; slow drafting; repeated grammar and article mistakes | Planning help, pattern tracking, rule explanations |
| Early-career professional | Emails, reports, cover letters | Clarity and tone feedback, speed |
| Native-speaker student | Grammar fine; structure and argument weak | Thesis, organization, logic feedback |

Get 3–5 outside testers by the end of milestone 4.

## Product principles

1. **Coach, not ghostwriter.** The AI never produces the user's sentences.
2. **Write first, AI second.** AI is silent during drafting; live feedback only in revision.
3. **Big picture before commas.** Structure, then paragraphs, then sentences.
4. **Remember the writer.** Feedback adapts to recurring patterns; progress is visible.
5. **Earn trust with precision.** A false alarm costs more than a miss.
6. **Respect the writer's voice.** Style choices aren't errors.

## User flow (one session = six phases)

1. **Set the goal:** genre, audience, length, optional assignment or rubric.
2. **Plan** (v1): AI asks questions; the writer builds the outline and thesis. Offer "outline first" or "freewrite first".
3. **Free write:** AI is off. Focus mode, word count, autosave. "A messy first draft is expected."
4. **Self-review** (v1): reverse outline, read aloud, checklist built from the writer's own recurring errors, flag predicted problem spots.
5. **AI feedback:** structure first, then sentences. Top 3 issues per pass, one specific strength. Hints only.
6. **Revise:** writer fixes; AI verifies each fix; live mode re-checks edits. Loops back to 5 until satisfied.

MVP flow: Set goal → Free write → AI feedback → Revise. Writer can always step back a phase. After the session: reflection question, progress update, next practice prompt (closes the loop).

Two entry modes: **Practice** (prompts aimed at weak spots) and **Real task** (assignment, work doc, article; deadlines; multi-session for long pieces).

## Features and requirements

| Feature | Requirement / acceptance | Release |
| --- | --- | --- |
| Accounts and history | Sign in; list, reopen, delete past sessions | MVP |
| Session setup | Genre, audience, length; optional assignment/rubric | MVP |
| Editor | Rich text, autosave, word count, focus mode | MVP |
| Phase gating | AI off during free write; explicit phase changes; can go back | MVP |
| Sentence-level feedback | Grammar, vocabulary, expression; each anchored to a span; ≥95% on the right span | MVP |
| Hint ladder | 3 levels (point, name, explain with a different example); leak rate <2% | MVP |
| Fix verification | After an edit, mark resolved or still open, with a reason | MVP |
| Layered feedback | Structure/paragraph comments before sentence comments | v1 |
| Planning coach | Socratic questions; AI never proposes a thesis | v1 |
| Self-review checklist | From top recurring error types; done before AI feedback | v1 |
| Error profile | Fixed taxonomy; counts per session; trend view | v1 |
| Tutor chat per comment | Explains and questions; never rewrites | v1 |
| Live revision mode | Changed paragraphs re-analyzed ≤ ~3 s after typing stops | v1 |
| Expression help | See below | v1 (milestone 4) |
| Process analytics | Time per phase, pauses, deletions | Later |
| Mini-lessons and drills | Generated from recurring errors | Later |
| Export | .docx/PDF, clipboard | Later |
| French support | Own rule cards and evals | Later |

**Hint ladder example** for "She have three years of experience in marketing":
1. Point: "Check the verb in this sentence."
2. Name: "Subject-verb agreement: the verb doesn't match its subject."
3. Explain: "With he, she, or it, present-tense verbs change form: 'He walks,' 'It goes.' Which form fits here?"

**Expression help (v1, milestone 4).** For when the writer knows what they mean but can't find the words. Gives ingredients, never the finished sentence.

| Tool | The user | The app returns |
| --- | --- | --- |
| Word finder | Describes a meaning | 3–5 candidate words with nuance, formality, word pairings |
| Usage explainer | Asks how to use a word or contrast | Rule + examples; user writes own sentence; AI checks it |
| Sentence frames | Picks a frame type | Content-free pattern, e.g. "Although ___, ___" |
| Meaning check | Highlights own sentence + states meaning | Explanation of mismatch + a question; never a rewrite |

Requirements: examples always on a different topic; usage explainer and meaning check unlock after the user's attempt; coach guard checks every help response; no complete sentence on the user's topic (leak rate <2%); looked-up words go to a word bank with spaced review; help usage tracked as a coaching signal.

**Allowed vs not allowed help during writing:**

| Allowed | Not allowed |
| --- | --- |
| Socratic questions when stuck | Suggesting sentences or paragraphs |
| Optional genre checklist | Completing a sentence |
| Word lookup for a word the user typed | "Make this sound better" |
| Planning notes in any language | Translating the user's sentences into final text |
| Session timer and goal | Grammar underlines while drafting |

## AI system design

Flow: Editor (Tiptap, sends only changed paragraphs) → API + job queue (paragraph-hash cache, debounce, cancel stale requests, stream results) → Orchestrator (picks checks by genre, phase, history; reads Memory) → specialist agents in parallel (Grammar: LanguageTool + small model; Clarity and vocab; Structure) → Coach guard (anchors comments to quoted spans, blocks hints that give away the fix) → streams back to the editor.

- **Agents:** hand-written orchestrator loop. Specialists return Zod-typed comments: quoted span, issue type, severity, confidence, three hint levels. Verifier agent re-checks spans after edits; tutor agent answers "why?".
- **RAG and memory:** ~100 rule cards (written by Obe) retrieved by error type and embedding similarity; writer's past errors and fixes; genre example paragraphs. Test "whole library in the prompt" vs retrieval first.
- **Coach guard:** fuzzy-match quotes to positions, drop unmatched comments; compare hints to the corrected sentence and regenerate or downgrade if too similar.
- **Real-time:** paragraph hashing and caching, debounce, cancellation; cheap model/LanguageTool for grammar, stronger model for structure.

Data model (first pass): User (id, email, native language) · Session (user, genre, audience, length, phase, phase timestamps) · Draft version (session, snapshot or diff) · Comment (session, quoted span, position, issue type, severity, hint level shown, status) · Error event (user, session, issue type, resolved) · Rule card (title, explanation, examples, issue type, embedding) · Eval case (input, expected spans and types, source).

## Evals and success metrics

Datasets: personal set (30–50 of Obe's paragraphs, hand-labeled); public learner corpora (BEA-2019 W&I+LOCNESS, CoNLL-2014, JFLEG — check licenses); adversarial set (rewrite requests, broken sentences, clean text).

| Eval | Measure | Target |
| --- | --- | --- |
| Error detection | Precision, recall, F0.5 vs labeled spans | Beat LanguageTool-only on F0.5 |
| Anchoring | Share of comments on the right span | ≥95% |
| Leak rate | Share of hints containing the fix | <2% |
| Hint quality | LLM judge on rubric, checked vs ~100 human labels | Judge agreement ≥80% |
| False alarms | Comments per 100 words on clean text | ~0 |
| Latency | p95 per paragraph | ≤3 s in live mode |
| Cost | Spend per 1,000 words | Budget set in milestone 3 |

Online: recurring-error rate trend, time to finish comparable pieces, resolve vs dismiss rate, return rate, writing-confidence check every few weeks.

## Milestones

1. **Thin slice:** editor, auth, sessions; one LLM call returns anchored comments. Gate: 30–50 labeled paragraphs; anchoring ≥95%.
2. **Coaching loop (MVP):** phase gating, hint ladder, fix verification, coach guard. Gate: leak rate <2%; used on real essays.
3. **Agents:** orchestrator + specialists, LanguageTool as a tool. Gate: beats single call on F0.5; cost budget set.
4. **Memory and RAG:** error profile, rule cards, self-review checklist, planning coach, tutor chat, expression help. Gate: recurring errors tracked; 3–5 outside testers.
5. **Live revision:** incremental re-analysis, caching, streaming, model routing. Gate: p95 ≤3 s; within budget.
6. **Ship and write up:** public demo, export, process analytics, blog post with eval results.

## Risks

Hints leak the answer · false alarms on correct text · anchoring breaks while typing · LLM cost in live mode · editor work eats the schedule · built only for one user · users want the AI to just fix it.

## Open questions

Product name · tester-only vs public demo · eval corpora licenses · can users skip self-review · error taxonomy to adopt · store full drafts or only diffs and error records.
