import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-4 py-10 sm:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Writing Coach</h1>
      <Link href="/write" className="font-medium underline underline-offset-4">
        Start writing →
      </Link>
    </main>
  );
}
