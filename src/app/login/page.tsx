import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <PlaceholderPage
      eyebrow="Sign in"
      title="Sign in"
      summary="Donors, verification officers, business partners, and administrators will each reach their own dashboard from here."
      later="Sign-in is not active yet. There are no accounts to open."
    />
  );
}
