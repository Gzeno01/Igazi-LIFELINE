import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/status/status-badge";
import { Button } from "@/components/ui/button";
import { rewardStatuses } from "@/lib/statuses";

export const metadata: Metadata = {
  title: "Verification status",
};

export default function DonationStatusPage() {
  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Donations</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Verification status
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        A donation earns points only after an authorized officer confirms it.
        Identity checks are a separate step and do not prove that a donation
        happened.
      </p>
      <div className="mt-8 max-w-2xl rounded-xl border border-warning/40 bg-warning px-4 py-4 text-sm leading-6 text-warning-foreground">
        <p className="font-semibold">No records yet</p>
        <p className="mt-1">
          Demonstration donation confirmations will appear here in a later
          phase. This page is not connected to a blood service.
        </p>
      </div>
      <ul className="mt-8 max-w-3xl divide-y rounded-xl border bg-card">
        {rewardStatuses.map((status) => (
          <li key={status.id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:gap-6">
            <div className="sm:w-48 sm:shrink-0">
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {status.explanation}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button asChild variant="outline" className="h-10 px-4">
          <Link href="/donations">Donation history</Link>
        </Button>
      </div>
    </PageShell>
  );
}
