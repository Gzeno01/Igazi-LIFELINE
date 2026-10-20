import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Points",
};

export default function PointsPage() {
  return (
    <PlaceholderPage
      eyebrow="Points"
      title="Points history"
      summary="Issued and redeemed points will be listed here after a donation is verified or a reward is confirmed. A verified donation is planned to earn 100 points."
      later="There is no balance yet. Points will be a reward score inside Igazi Lifeline, not cash."
    />
  );
}
