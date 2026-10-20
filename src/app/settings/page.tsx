import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Account settings",
};

export default function SettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="Account"
      title="Profile and settings"
      summary="You will update your name, email, and password here after you have an account."
      later="Settings cannot be saved yet because registration is not connected."
    />
  );
}
