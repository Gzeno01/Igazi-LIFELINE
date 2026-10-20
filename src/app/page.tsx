import Link from "next/link";
import {
  BadgeCheck,
  Building,
  ClipboardList,
  Gift,
  ShieldCheck,
} from "lucide-react";

import { StatusBadge } from "@/components/status/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { rewardStatuses } from "@/lib/statuses";

const steps = [
  {
    title: "Donate with a blood service",
    body: "You give blood at a clinic or drive run by a professional blood service. Igazi Lifeline does not collect blood.",
  },
  {
    title: "An officer confirms the donation",
    body: "Authorized staff record a unique donation reference. A donor cannot approve their own donation.",
  },
  {
    title: "Points are added once",
    body: "A verified donation is planned to earn 100 points, and only if that reference has not already been used.",
  },
  {
    title: "Redeem a reward",
    body: "Spend points on an offer from a participating business. Points are a reward score, not cash.",
  },
];

const audiences = [
  {
    title: "Donors",
    body: "See donation status, points, and rewards after you create an account.",
    href: "/register",
    action: "Become a donor",
    icon: BadgeCheck,
  },
  {
    title: "Verification officers",
    body: "Review donation confirmations. Ordinary donors cannot verify donations.",
    href: "/verification",
    action: "Officer access",
    icon: ClipboardList,
  },
  {
    title: "Business partners",
    body: "Publish reward offers and confirm redemptions for your own business.",
    href: "/partner",
    action: "Business access",
    icon: Building,
  },
  {
    title: "Administrators",
    body: "Manage roles, approve businesses, and review activity from a protected area.",
    href: "/admin",
    action: "Admin access",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <main id="main">
      <section className="border-b bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              Blood donation rewards
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-tight">
              Donate Blood. Earn Rewards. Make a Difference.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Igazi Lifeline helps verified donors earn points they can redeem
              at participating businesses. You donate with a professional blood
              service. This website records the confirmation and the rewards.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="h-11 px-5 text-base">
                <Link href="/register">Become a Donor</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-5 text-base">
                <Link href="/rewards">Explore Rewards</Link>
              </Button>
              <Button asChild variant="ghost" className="h-11 px-5 text-base">
                <Link href="#how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>What this prototype includes</CardTitle>
              <CardDescription>
                Accounts are working. Donation verification and live redemption
                come next.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-6">
              <p>You can register as a donor or sign in with a labelled demonstration account.</p>
              <p>A verified donation is planned to earn 100 points. An administrator can change that number.</p>
              <p>Officers cannot be created from the public registration form.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Points are issued only after an authorized confirmation. Submitting
            a form as a donor will never add points by itself.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardDescription>Step {index + 1}</CardDescription>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-6 text-muted-foreground">{step.body}</p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Who it is for
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <Card key={audience.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon aria-hidden="true" className="size-4 text-primary" />
                      {audience.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <p className="leading-6 text-muted-foreground">{audience.body}</p>
                    <Button asChild variant="outline" className="mt-auto h-10 w-fit px-4">
                      <Link href={audience.href}>{audience.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What each status means
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                These labels will appear on donation and reward records. There
                are no records to show until verification is connected.
              </p>
            </div>
            <Button asChild variant="ghost" className="h-10 w-fit px-3">
              <Link href="/donations/status">
                <Gift aria-hidden="true" />
                Verification status
              </Link>
            </Button>
          </div>
          <ul className="mt-8 divide-y rounded-xl border bg-card">
            {rewardStatuses.map((status) => (
              <li
                key={status.id}
                className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:gap-6"
              >
                <div className="sm:w-48 sm:shrink-0">
                  <StatusBadge label={status.label} tone={status.tone} />
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {status.explanation}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
