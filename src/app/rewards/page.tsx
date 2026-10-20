import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sampleReward } from "@/lib/sample-reward";

export const metadata: Metadata = {
  title: "Rewards",
};

export default function RewardsPage() {
  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Marketplace</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Explore rewards
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Participating businesses will list rewards here. Points are a reward
        score you spend inside Igazi Lifeline. They are not cash.
      </p>
      <div className="mt-8 max-w-2xl rounded-xl border bg-muted px-4 py-4 text-sm leading-6">
        <p className="font-semibold">No participating businesses yet</p>
        <p className="mt-1 text-muted-foreground">
          The card below is a sample layout so you can see what an offer will
          contain. It is not a real business and it cannot be redeemed.
        </p>
      </div>
      <Card className="mt-6 max-w-xl">
        <CardHeader>
          <CardDescription>Sample layout, not a real offer</CardDescription>
          <CardTitle>{sampleReward.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm leading-6">
          <p>{sampleReward.businessName}</p>
          <p className="text-muted-foreground">{sampleReward.description}</p>
          <p className="font-medium">{sampleReward.pointsRequired} points</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="h-10 px-4">
            <Link href="/rewards/sample">View sample details</Link>
          </Button>
        </CardFooter>
      </Card>
    </PageShell>
  );
}
