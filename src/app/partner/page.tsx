import type { Metadata } from "next";

import { AccountGate } from "@/components/account/account-gate";
import { PageShell } from "@/components/layout/page-shell";
import { requireRoles } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Business dashboard",
};

async function PartnerHome() {
  const user = await requireRoles(["BUSINESS_PARTNER", "ADMIN"]);

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Business partner</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {user.business?.businessName ?? "Business dashboard"}
      </h1>
      {user.isDemonstration ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Demonstration business. Not a real partnership.
        </p>
      ) : null}
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Signed in as {user.name}. Status: {user.business?.status ?? "No business record yet"}.
        Offer management and redemption confirmation come in the next phase.
      </p>
    </PageShell>
  );
}

export default function PartnerPage() {
  return (
    <AccountGate>
      <PartnerHome />
    </AccountGate>
  );
}
