import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Donation history",
};

export default function DonationsPage() {
  return (
    <PlaceholderPage
      eyebrow="Donations"
      title="Donation history"
      summary="Verified, pending, and rejected donations will be listed here with the date and reference recorded by a verification officer."
      later="No donation records exist yet. Donors will not be able to mark their own donations as verified."
    />
  );
}
