import { randomUUID } from "node:crypto";

import { afterAll, describe, expect, it } from "vitest";

import { authenticate, registerDonor } from "@/server/accounts";
import { prisma } from "@/server/db";

const createdEmails: string[] = [];

function uniqueEmail() {
  const email = `test-${randomUUID()}@example.com`;
  createdEmails.push(email);
  return email;
}

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: createdEmails } },
  });
  await prisma.$disconnect();
});

describe("registration and sign-in", () => {
  it("creates a donor and rejects a second account with the same email", async () => {
    const email = uniqueEmail();
    const input = {
      name: "Test Donor",
      email,
      password: "Lifeline-test-100",
      confirmPassword: "Lifeline-test-100",
    };

    const created = await registerDonor(input);
    expect(created.ok).toBe(true);
    if (!created.ok) {
      return;
    }
    expect(created.role).toBe("DONOR");

    const account = await prisma.user.findUnique({
      where: { id: created.userId },
      include: { rewardAccount: true, identity: true },
    });
    expect(account?.rewardAccount?.availablePoints).toBe(0);
    expect(account?.identity?.status).toBe("UNVERIFIED");
    expect(account?.passwordHash.includes("Lifeline-test-100")).toBe(false);

    const duplicate = await registerDonor(input);
    expect(duplicate).toEqual({
      ok: false,
      error: "An account with that email already exists.",
    });
  });

  it("rejects a short password before creating an account", async () => {
    const before = await prisma.user.count();
    const result = await registerDonor({
      name: "Short Password",
      email: uniqueEmail(),
      password: "short1",
      confirmPassword: "short1",
    });
    expect(result.ok).toBe(false);
    expect(await prisma.user.count()).toBe(before);
  });

  it("signs in with the right password and rejects the wrong one", async () => {
    const email = uniqueEmail();
    await registerDonor({
      name: "Sign In Donor",
      email,
      password: "Lifeline-test-100",
      confirmPassword: "Lifeline-test-100",
    });

    const wrong = await authenticate(email, "Lifeline-test-999");
    expect(wrong.ok).toBe(false);

    const right = await authenticate(email.toUpperCase(), "Lifeline-test-100");
    expect(right.ok).toBe(true);
  });

  it("rejects a suspended account", async () => {
    const email = uniqueEmail();
    const created = await registerDonor({
      name: "Suspended Donor",
      email,
      password: "Lifeline-test-100",
      confirmPassword: "Lifeline-test-100",
    });
    if (!created.ok) {
      throw new Error(created.error);
    }

    await prisma.user.update({
      where: { id: created.userId },
      data: { status: "SUSPENDED" },
    });

    const result = await authenticate(email, "Lifeline-test-100");
    expect(result).toEqual({ ok: false, error: "This account is suspended." });
  });
});
