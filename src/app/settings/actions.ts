"use server";

import { revalidatePath } from "next/cache";

import type { UserRole } from "@/lib/roles";
import { userRoles } from "@/lib/roles";
import { ensureAccountRecords } from "@/server/accounts";
import { requireRoles } from "@/server/current-user";
import { prisma } from "@/server/db";
import { hashPassword, verifyPassword } from "@/server/password";
import {
  fieldErrorsFrom,
  passwordChangeSchema,
  profileSchema,
  type FieldErrors,
} from "@/server/validation";

export type SettingsState = {
  formError?: string;
  message?: string;
  fieldErrors?: FieldErrors;
};

function isUserRole(value: string): value is UserRole {
  return userRoles.some((role) => role === value);
}

export async function updateProfileAction(
  _previous: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const user = await requireRoles([
    "DONOR",
    "VERIFICATION_OFFICER",
    "BUSINESS_PARTNER",
    "ADMIN",
  ]);
  const parsed = profileSchema.safeParse({
    name: String(formData.get("name") ?? ""),
  });
  if (!parsed.success) {
    return fieldErrorsFrom(parsed.error);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });
  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "user.profile_updated",
      entityType: "User",
      entityId: user.id,
    },
  });
  revalidatePath("/settings");
  return { message: "Name saved." };
}

export async function changePasswordAction(
  _previous: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const user = await requireRoles([
    "DONOR",
    "VERIFICATION_OFFICER",
    "BUSINESS_PARTNER",
    "ADMIN",
  ]);
  const parsed = passwordChangeSchema.safeParse({
    currentPassword: String(formData.get("currentPassword") ?? ""),
    newPassword: String(formData.get("newPassword") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });
  if (!parsed.success) {
    return fieldErrorsFrom(parsed.error);
  }

  const stored = await prisma.user.findUnique({
    where: { id: user.id },
    select: { passwordHash: true },
  });
  if (!stored || !(await verifyPassword(parsed.data.currentPassword, stored.passwordHash))) {
    return { formError: "Current password is incorrect." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.newPassword) },
  });
  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      action: "user.password_changed",
      entityType: "User",
      entityId: user.id,
    },
  });
  return { message: "Password updated." };
}

export async function updateAccessAction(
  _previous: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const admin = await requireRoles(["ADMIN"]);
  const userId = String(formData.get("userId") ?? "");
  const roleValue = String(formData.get("role") ?? "");
  const statusValue = String(formData.get("status") ?? "");

  if (!isUserRole(roleValue) || (statusValue !== "ACTIVE" && statusValue !== "SUSPENDED")) {
    return { formError: "Choose a valid role and status." };
  }

  if (admin.id === userId) {
    return { formError: "You cannot change your own access." };
  }

  const target = await prisma.user.findUnique({ where: { id: userId } });
  if (!target) {
    return { formError: "That account was not found." };
  }

  const removesLastAdmin =
    target.role === "ADMIN" &&
    target.status === "ACTIVE" &&
    (roleValue !== "ADMIN" || statusValue !== "ACTIVE");

  if (removesLastAdmin) {
    const otherAdmins = await prisma.user.count({
      where: { role: "ADMIN", status: "ACTIVE", NOT: { id: target.id } },
    });
    if (otherAdmins === 0) {
      return { formError: "Keep at least one active administrator." };
    }
  }

  await prisma.user.update({
    where: { id: target.id },
    data: { role: roleValue, status: statusValue },
  });
  await ensureAccountRecords(target.id);

  if (roleValue === "BUSINESS_PARTNER") {
    await prisma.businessPartner.upsert({
      where: { userId: target.id },
      update: {},
      create: {
        userId: target.id,
        businessName: `${target.name}'s business`,
        description: "Created when an administrator assigned the business partner role.",
        status: "PENDING",
      },
    });
  }

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "user.access_changed",
      entityType: "User",
      entityId: target.id,
      metadata: {
        fromRole: target.role,
        toRole: roleValue,
        fromStatus: target.status,
        toStatus: statusValue,
      },
    },
  });
  revalidatePath("/admin");
  return { message: "Access saved." };
}

export async function updateBusinessStatusAction(formData: FormData) {
  const admin = await requireRoles(["ADMIN"]);
  const businessId = String(formData.get("businessId") ?? "");
  const statusValue = String(formData.get("status") ?? "");
  if (statusValue !== "PENDING" && statusValue !== "APPROVED" && statusValue !== "SUSPENDED") {
    return;
  }

  const business = await prisma.businessPartner.findUnique({ where: { id: businessId } });
  if (!business) {
    return;
  }

  await prisma.businessPartner.update({
    where: { id: business.id },
    data: { status: statusValue },
  });
  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "business.status_changed",
      entityType: "BusinessPartner",
      entityId: business.id,
      metadata: { from: business.status, to: statusValue },
    },
  });
  revalidatePath("/admin");
}

export async function updateRewardRuleAction(
  _previous: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const admin = await requireRoles(["ADMIN"]);
  const points = Number(formData.get("points"));
  if (!Number.isInteger(points) || points < 1 || points > 10000) {
    return { formError: "Enter a whole number from 1 to 10000." };
  }

  await prisma.rewardRule.upsert({
    where: { id: "default" },
    update: { pointsPerVerifiedDonation: points },
    create: { id: "default", pointsPerVerifiedDonation: points },
  });
  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "reward_rule.updated",
      entityType: "RewardRule",
      entityId: "default",
      metadata: { pointsPerVerifiedDonation: points },
    },
  });
  revalidatePath("/admin");
  return { message: "Reward rule saved." };
}
