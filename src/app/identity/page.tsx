import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Identity verification",
};

export default function IdentityPage() {
  return (
    <PlaceholderPage
      eyebrow="Identity"
      title="Identity verification"
      summary="Some rewards will ask for an identity check before redemption. That check is separate from donation verification and does not prove that you gave blood."
      later="No identity provider is connected. This prototype will not ask you to upload documents. A labelled demonstration status comes in a later phase."
    />
  );
}
