import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Verification",
};

export default function VerificationPage() {
  return (
    <PlaceholderPage
      eyebrow="Verification officer"
      title="Donation verification"
      summary="Authorized officers will confirm or reject a donation reference here. Only an approved donation can lead to reward points."
      later="The officer workflow is not active. This screen is not connected to a blood service, and donors cannot verify their own donations."
    />
  );
}
