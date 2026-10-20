import { prisma } from "@/server/db";
import { hashPassword, verifyPassword } from "@/server/password";
import { registerSchema } from "@/server/validation";

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  status: true,
  isDemonstration: true,
  rewardAccount: true,
  identity: true,
  business: true,
} as const;

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof findUserById>>>;

let dummyHash: Promise<string> | null = null;

function unusedPasswordHash() {
  dummyHash ??= hashPassword("unused-password-value");
  return dummyHash;
}

export async function ensureAccountRecords(userId: string) {
  await prisma.donorProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  await prisma.rewardAccount.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  await prisma.identityVerification.upsert({
    where: { userId },
    update: {},
    create: { userId, status: "UNVERIFIED", provider: "none" },
  });
}

export async function registerDonor(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      ok: false as const,
      error: "An account with that email already exists.",
    };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      passwordHash,
      role: "DONOR",
      status: "ACTIVE",
    },
    select: { id: true, role: true },
  });

  await ensureAccountRecords(user.id);
  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "user.registered",
      entityType: "User",
      entityId: user.id,
    },
  });

  return { ok: true as const, userId: user.id, role: user.role };
}

export async function authenticate(email: string, password: string) {
  const normalized = email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalized } });
  const hash = user?.passwordHash ?? (await unusedPasswordHash());
  const matches = await verifyPassword(password, hash);

  if (!user || !matches) {
    return { ok: false as const, error: "Email or password is incorrect." };
  }

  if (user.status !== "ACTIVE") {
    return { ok: false as const, error: "This account is suspended." };
  }

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "user.signed_in",
      entityType: "User",
      entityId: user.id,
    },
  });

  return {
    ok: true as const,
    userId: user.id,
    role: user.role,
  };
}

export async function getRewardRule() {
  const rule = await prisma.rewardRule.findUnique({ where: { id: "default" } });
  return rule?.pointsPerVerifiedDonation ?? 100;
}
