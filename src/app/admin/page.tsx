import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Administration",
};

export default function AdminPage() {
  return (
    <PlaceholderPage
      eyebrow="Administrator"
      title="Administration"
      summary="Administrators will manage roles, approve businesses, set the points awarded for a verified donation, and review audit activity."
      later="Admin access is not active. Privileged actions will be checked on the server when accounts are added."
    />
  );
}
