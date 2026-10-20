import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Become a donor",
};

export default function RegisterPage() {
  return (
    <PlaceholderPage
      eyebrow="Registration"
      title="Become a donor"
      summary="This is where you will create an account, choose a password, and open your donor dashboard."
      later="Registration is not active yet. Nothing you enter here would be saved, so the form is not shown."
    />
  );
}
