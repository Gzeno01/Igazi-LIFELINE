import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Business dashboard",
};

export default function PartnerPage() {
  return (
    <PlaceholderPage
      eyebrow="Business partner"
      title="Business dashboard"
      summary="Approved businesses will manage their reward offers and confirm redemptions from this page."
      later="Business sign-in is not active. No real partnerships are listed in this prototype."
    />
  );
}
