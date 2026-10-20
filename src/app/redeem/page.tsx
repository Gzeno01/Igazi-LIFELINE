import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { sampleReward } from "@/lib/sample-reward";

export const metadata: Metadata = {
  title: "Redemption",
};

export default function RedeemPage() {
  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Redemption</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Confirm a redemption
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        When redemption is active, this page will ask you to confirm spending{" "}
        {sampleReward.pointsRequired} points. The server will check your
        balance and block a second spend of the same points.
      </p>
      <div className="mt-8 max-w-2xl rounded-xl border border-warning/40 bg-warning px-4 py-4 text-sm leading-6 text-warning-foreground">
        <p className="font-semibold">Placeholder</p>
        <p className="mt-1">
          Redemption is not active. There is no point balance, and the sample
          reward cannot be spent. No confirmation button is shown because it
          would not complete a redemption.
        </p>
      </div>
      <div className="mt-8">
        <Button asChild variant="outline" className="h-10 px-4">
          <Link href="/rewards/sample">Back to sample reward</Link>
        </Button>
      </div>
    </PageShell>
  );
}
