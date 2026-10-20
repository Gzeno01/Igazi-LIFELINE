export type StatusTone = "success" | "warning" | "danger";

export type StatusDefinition = {
  id: string;
  label: string;
  tone: StatusTone;
  explanation: string;
};

export const rewardStatuses: StatusDefinition[] = [
  {
    id: "pending-verification",
    label: "Pending verification",
    tone: "warning",
    explanation:
      "A donation has been recorded and is waiting for an authorized officer to confirm it. Points are not added yet.",
  },
  {
    id: "verified",
    label: "Verified",
    tone: "success",
    explanation:
      "An authorized officer confirmed this donation. A verified donation is the only kind that can earn points.",
  },
  {
    id: "rejected",
    label: "Rejected",
    tone: "danger",
    explanation:
      "An authorized officer declined this donation record. It does not earn points.",
  },
  {
    id: "reward-issued",
    label: "Reward issued",
    tone: "success",
    explanation:
      "Points for a verified donation were recorded successfully and added to the available balance.",
  },
  {
    id: "redemption-pending",
    label: "Redemption pending",
    tone: "warning",
    explanation:
      "A reward redemption has been requested and is waiting for confirmation. The points stay reserved until it finishes.",
  },
  {
    id: "redeemed",
    label: "Redeemed",
    tone: "success",
    explanation:
      "The reward was confirmed and the reserved points have been spent.",
  },
  {
    id: "failed",
    label: "Failed",
    tone: "danger",
    explanation:
      "The reward transaction did not complete. Failed issuances do not add points, and failed redemptions return any reserved points.",
  },
];
