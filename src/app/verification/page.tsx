import type { Metadata } from "next";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { requireRoles } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Verification",
};

async function OfficerHome() {
  const user = await requireRoles(["VERIFICATION_OFFICER", "ADMIN"]);

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Verification officer</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Donation verification
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Signed in as {user.name}. Confirming and rejecting donations is the
        next phase. Donors cannot open this page, and an officer will not be
        able to verify their own donation.
      </p>
      <p className="mt-6 rounded-xl border border-warning/40 bg-warning px-4 py-4 text-sm leading-6 text-warning-foreground">
        No blood-service connection is active. Nothing on this screen issues
        reward points.
      </p>
    </PageShell>
  );
}

export default function VerificationPage() {
  return (
    <AccountGate>
      <OfficerHome />
    </AccountGate>
  );
}
