import type { Metadata } from "next";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { StatusBadge } from "@/components/status/status-badge";
import { requireUser } from "@/server/current-user";
import { prisma } from "@/server/db";
import type { StatusTone } from "@/lib/statuses";

export const metadata: Metadata = {
  title: "Points",
};

const toneForStatus = {
  PENDING: "warning",
  CONFIRMED: "success",
  FAILED: "danger",
} as const satisfies Record<string, StatusTone>;

async function PointsHistory() {
  const user = await requireUser();
  const transactions = await prisma.rewardTransaction.findMany({
    where: { donorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Points</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Points history
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Available balance: {user.rewardAccount?.availablePoints ?? 0} points.
        Points are a reward score inside Igazi Lifeline, not cash.
      </p>
      {transactions.length === 0 ? (
        <p className="mt-8 rounded-xl border bg-muted px-4 py-4 text-sm leading-6">
          No point transactions yet. A verified donation has not been recorded
          for this account.
        </p>
      ) : (
        <ul className="mt-8 divide-y rounded-xl border bg-card">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm">
                {transaction.type} · {transaction.points} points
              </p>
              <StatusBadge
                label={transaction.status === "CONFIRMED" ? "Reward issued" : transaction.status === "FAILED" ? "Failed" : "Pending verification"}
                tone={toneForStatus[transaction.status]}
              />
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}

export default function PointsPage() {
  return (
    <AccountGate>
      <PointsHistory />
    </AccountGate>
  );
}
