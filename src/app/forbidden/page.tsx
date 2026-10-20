import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Access denied",
};

export default function ForbiddenPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold tracking-tight">Access denied</h1>
      <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
        Your account does not have permission for that page. Hiding a link is
        not what blocks it. The server checks your role.
      </p>
      <div className="mt-8">
        <Button asChild className="h-10 px-4">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </PageShell>
  );
}
