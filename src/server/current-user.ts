import { redirect } from "next/navigation";

import { roleCanAccess, type UserRole } from "@/lib/roles";
import { findUserById, type CurrentUser } from "@/server/accounts";
import { getSession } from "@/server/session";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();
  if (!session.userId) {
    return null;
  }

  const user = await findUserById(session.userId);
  if (!user || user.status !== "ACTIVE") {
    session.destroy();
    return null;
  }

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireRoles(roles: readonly UserRole[]) {
  const user = await requireUser();
  if (!roleCanAccess(user.role, roles)) {
    redirect("/forbidden");
  }
  return user;
}
