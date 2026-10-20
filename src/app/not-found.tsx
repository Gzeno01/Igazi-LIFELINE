import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
        That address is not part of Igazi Lifeline.
      </p>
      <div className="mt-8">
        <Button asChild className="h-10 px-4">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </PageShell>
  );
}
