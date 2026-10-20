import type { Metadata } from "next";
import Link from "next/link";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/status/status-badge";
import { Button } from "@/components/ui/button";
import { rewardStatuses } from "@/lib/statuses";
import { requireUser } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Verification status",
};

async function StatusGuide() {
  await requireUser();

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Donations</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Verification status
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        A donation earns points only after an authorized officer confirms it.
        Identity verification is a separate check and does not prove that a
        donation happened.
      </p>
      <ul className="mt-8 max-w-3xl divide-y rounded-xl border bg-card">
        {rewardStatuses.map((status) => (
          <li key={status.id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:gap-6">
            <div className="sm:w-48 sm:shrink-0">
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{status.explanation}</p>
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

export default function DonationStatusPage() {
  return (
    <AccountGate>
      <StatusGuide />
    </AccountGate>
  );
}
