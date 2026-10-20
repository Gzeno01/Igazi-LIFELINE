export const sampleReward = {
  id: "sample",
  name: "Weekend coffee for two",
  businessName: "Sample Cafe",
  description:
    "A layout example of a reward a participating cafe might offer after a verified donation.",
  pointsRequired: 100,
  availability: "Sample only",
  terms:
    "This sample is not redeemable. A real offer would list expiry, who can use it, and any limit per donor.",
  instructions:
    "A real redemption would show a confirmation code the business can check. This sample does not create a code.",
  isSample: true,
} as const;
