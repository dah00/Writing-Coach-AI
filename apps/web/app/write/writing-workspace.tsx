"use client";

import { useState } from "react";
import type { FeedbackComment } from "@writing-coach/shared";
import { FAKE_COMMENTS } from "./fake-comments";

export function WritingWorkspace() {
  const [text, setText] = useState("");
  // null = feedback not requested yet. [] = requested, nothing to say.
  const [comments, setComments] = useState<FeedbackComment[] | null>(null);

  function handleGetFeedback() {
    // Fake for now. Later: POST the text to apps/api and show its comments.
    setComments(FAKE_COMMENTS);
  }

  const canRequest = text.trim().length > 0;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[1fr_20rem]">
      <section className="flex flex-col gap-3">
        <label htmlFor="draft" className="text-sm font-medium">
          Your draft
        </label>
        <textarea
          id="draft"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          placeholder="Start writing here…"
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white p-4 text-base leading-7 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:ring-zinc-800"
        />
        <button
          type="button"
          onClick={handleGetFeedback}
          disabled={!canRequest}
          className="self-start rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Get feedback
        </button>
      </section>

      <section aria-labelledby="feedback-heading" aria-live="polite">
        <h2 id="feedback-heading" className="text-sm font-medium">
          Feedback
        </h2>
        {comments === null ? (
          <p className="mt-3 text-sm text-zinc-500">No feedback yet.</p>
        ) : comments.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">Nothing to point out.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {comments.map((comment, index) => (
              // Index as key is fine for a static fake list. Real comments get an id.
              <li key={index}>
                <CommentCard comment={comment} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function CommentCard({ comment }: { comment: FeedbackComment }) {
  // Placeholder: the real layout is written once FeedbackComment has fields.
  return (
    <article className="rounded-lg border border-zinc-200 p-4 text-sm dark:border-zinc-800">
      <pre className="whitespace-pre-wrap">{JSON.stringify(comment, null, 2)}</pre>
    </article>
  );
}
