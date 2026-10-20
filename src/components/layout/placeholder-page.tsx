import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page-shell";

export function PlaceholderPage({
  eyebrow,
  title,
  summary,
  later,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  later: string;
}) {
  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        {summary}
      </p>
      <div className="mt-8 max-w-2xl rounded-xl border border-warning/40 bg-warning px-4 py-4 text-warning-foreground">
        <p className="text-sm font-semibold">Placeholder</p>
        <p className="mt-1 text-sm leading-6">{later}</p>
      </div>
      <div className="mt-8">
        <Button asChild variant="outline" className="h-10 px-4">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </PageShell>
  );
}
