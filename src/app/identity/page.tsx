import type { Metadata } from "next";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { requireUser } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Identity verification",
};

const statusCopy = {
  UNVERIFIED: "Not started. No identity provider is connected.",
  PENDING: "A check is in progress.",
  VERIFIED: "Identity has been confirmed by the configured provider.",
  REJECTED: "The identity check was not accepted.",
};

async function IdentityStatus() {
  const user = await requireUser();
  const status = user.identity?.status ?? "UNVERIFIED";

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Identity</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Identity verification
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Some rewards will ask for an identity check before redemption. That
        check does not prove you gave blood. This page stores a status only.
        It does not ask for documents.
      </p>
      <div className="mt-8 max-w-2xl rounded-xl border bg-card px-4 py-4">
        <p className="text-sm font-medium">Current status</p>
        <p className="mt-1 text-lg font-semibold">{status}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{statusCopy[status]}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Provider: {user.identity?.provider ?? "none"}
        </p>
      </div>
    </PageShell>
  );
}

export default function IdentityPage() {
  return (
    <AccountGate>
      <IdentityStatus />
    </AccountGate>
  );
}
