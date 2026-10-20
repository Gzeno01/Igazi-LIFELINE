import "dotenv/config";

import { hashPassword } from "../src/server/password";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const DEMO_PASSWORD = "Lifeline-demo-100";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const people = [
  {
    email: "donor@demo.lifeline.test",
    name: "Demo Donor",
    role: "DONOR" as const,
  },
  {
    email: "officer@demo.lifeline.test",
    name: "Demo Officer",
    role: "VERIFICATION_OFFICER" as const,
  },
  {
    email: "partner@demo.lifeline.test",
    name: "Demo Partner",
    role: "BUSINESS_PARTNER" as const,
  },
  {
    email: "admin@demo.lifeline.test",
    name: "Demo Admin",
    role: "ADMIN" as const,
  },
];

async function main() {
  const passwordHash = await hashPassword(DEMO_PASSWORD);

  for (const person of people) {
    const user = await prisma.user.upsert({
      where: { email: person.email },
      update: {
        name: person.name,
        role: person.role,
        status: "ACTIVE",
        isDemonstration: true,
        passwordHash,
      },
      create: {
        email: person.email,
        name: person.name,
        role: person.role,
        status: "ACTIVE",
        isDemonstration: true,
        passwordHash,
      },
    });

    await prisma.donorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    await prisma.rewardAccount.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });
    await prisma.identityVerification.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, status: "UNVERIFIED", provider: "none" },
    });

    if (person.role === "BUSINESS_PARTNER") {
      await prisma.businessPartner.upsert({
        where: { userId: user.id },
        update: {
          businessName: "Sample Cafe",
          description: "Demonstration business. Not a real participating cafe.",
          status: "APPROVED",
        },
        create: {
          userId: user.id,
          businessName: "Sample Cafe",
          description: "Demonstration business. Not a real participating cafe.",
          status: "APPROVED",
        },
      });
    }
  }

  await prisma.rewardRule.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", pointsPerVerifiedDonation: 100 },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
