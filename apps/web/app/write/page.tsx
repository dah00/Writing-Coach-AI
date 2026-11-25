import type { Metadata } from "next";
import { WritingWorkspace } from "./writing-workspace";

export const metadata: Metadata = {
  title: "Write · Writing Coach",
};

// Server component: static shell only. The interactive part is a client component.
export default function WritePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Write</h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Write your draft first. Then ask for feedback. The coach gives hints, never rewrites.
      </p>
      <WritingWorkspace />
    </main>
  );
}
