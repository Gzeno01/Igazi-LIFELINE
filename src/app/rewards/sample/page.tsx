import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { sampleReward } from "@/lib/sample-reward";

export const metadata: Metadata = {
  title: "Sample reward",
};

const details = [
  { label: "Business", value: sampleReward.businessName },
  { label: "Points required", value: `${sampleReward.pointsRequired} points` },
  { label: "Availability", value: sampleReward.availability },
  { label: "Description", value: sampleReward.description },
  { label: "Terms and conditions", value: sampleReward.terms },
  { label: "Redemption instructions", value: sampleReward.instructions },
];

export default function SampleRewardPage() {
  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Sample layout</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {sampleReward.name}
      </h1>
      <p className="mt-4 max-w-2xl rounded-xl border border-warning/40 bg-warning px-4 py-4 text-sm leading-6 text-warning-foreground">
        This is demonstration content. Sample Cafe is not a participating
        business, and this reward cannot be redeemed.
      </p>
      <dl className="mt-8 max-w-2xl divide-y rounded-xl border bg-card">
        {details.map((detail) => (
          <div key={detail.label} className="grid gap-1 px-4 py-4 sm:grid-cols-3">
            <dt className="text-sm font-medium">{detail.label}</dt>
            <dd className="text-sm leading-6 text-muted-foreground sm:col-span-2">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-10 px-4">
          <Link href="/redeem">Review redemption</Link>
        </Button>
        <Button asChild variant="outline" className="h-10 px-4">
          <Link href="/rewards">Back to rewards</Link>
        </Button>
      </div>
    </PageShell>
  );
}
