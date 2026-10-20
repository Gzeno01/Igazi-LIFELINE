import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Donor dashboard",
};

export default function DashboardPage() {
  return (
    <PlaceholderPage
      eyebrow="Donor"
      title="Your dashboard"
      summary="After sign-in, this page will show your points, verified donations, pending checks, recent reward activity, and a link to your donation history."
      later="There is no signed-in donor yet, so balances and records are not shown."
    />
  );
}
