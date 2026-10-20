import type { Metadata } from "next";
import Link from "next/link";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/status/status-badge";
import { Button } from "@/components/ui/button";
import { requireRoles } from "@/server/current-user";
import { prisma } from "@/server/db";
import type { StatusTone } from "@/lib/statuses";

export const metadata: Metadata = {
  title: "Donation history",
};

const toneForStatus = {
  PENDING: "warning",
  VERIFIED: "success",
  REJECTED: "danger",
} as const satisfies Record<string, StatusTone>;

async function DonationHistory() {
  const user = await requireRoles(["DONOR"]);
  const donations = await prisma.donation.findMany({
    where: { donorId: user.id },
    orderBy: { donationDate: "desc" },
  });

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Donations</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Donation history
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Records appear here after a verification officer confirms a donation.
        You cannot verify your own donation.
      </p>
      {donations.length === 0 ? (
        <p className="mt-8 rounded-xl border bg-muted px-4 py-4 text-sm leading-6">
          No donation records yet. The officer confirmation workflow is not
          active in this phase.
        </p>
      ) : (
        <ul className="mt-8 divide-y rounded-xl border bg-card">
          {donations.map((donation) => (
            <li key={donation.id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center">
              <StatusBadge
                label={donation.status === "PENDING" ? "Pending verification" : donation.status === "VERIFIED" ? "Verified" : "Rejected"}
                tone={toneForStatus[donation.status]}
              />
              <p className="text-sm text-muted-foreground">
                {donation.donationReference} · {donation.centerName}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Button asChild variant="outline" className="h-10 px-4">
          <Link href="/donations/status">What the statuses mean</Link>
        </Button>
      </div>
    </PageShell>
  );
}

export default function DonationsPage() {
  return (
    <AccountGate>
      <DonationHistory />
    </AccountGate>
  );
}
