import type { Metadata } from "next";
import Link from "next/link";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRewardRule } from "@/server/accounts";
import { requireRoles } from "@/server/current-user";
import { prisma } from "@/server/db";

export const metadata: Metadata = {
  title: "Donor dashboard",
};

async function DonorDashboard() {
  const user = await requireRoles(["DONOR"]);
  const [verified, pending, latestRedemption, rule] = await Promise.all([
    prisma.donation.count({ where: { donorId: user.id, status: "VERIFIED" } }),
    prisma.donation.count({ where: { donorId: user.id, status: "PENDING" } }),
    prisma.redemption.findFirst({
      where: { donorId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    getRewardRule(),
  ]);
  const transactions = await prisma.rewardTransaction.findMany({
    where: { donorId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Donor</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Welcome, {user.name}
      </h1>
      {user.isDemonstration ? (
        <p className="mt-3 text-sm text-muted-foreground">Demonstration account</p>
      ) : null}
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        A verified donation currently earns {rule} points. Points are added
        only after an authorized officer confirms a donation. That workflow is
        not active yet, so this balance stays at zero until then.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Available points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{user.rewardAccount?.availablePoints ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verified donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{verified}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending checks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{pending}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Button asChild className="h-11 px-5">
          <Link href="/donations">View donation history</Link>
        </Button>
      </div>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Recent reward activity</h2>
        {transactions.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            No reward transactions yet.
          </p>
        ) : (
          <ul className="mt-3 divide-y rounded-xl border bg-card">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="px-4 py-3 text-sm">
                {transaction.type} · {transaction.points} points · {transaction.status}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Latest redemption</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {latestRedemption
            ? `${latestRedemption.status} · ${latestRedemption.pointsSpent} points`
            : "No redemption yet."}
        </p>
      </section>
    </PageShell>
  );
}

export default function DashboardPage() {
  return (
    <AccountGate>
      <DonorDashboard />
    </AccountGate>
  );
}
