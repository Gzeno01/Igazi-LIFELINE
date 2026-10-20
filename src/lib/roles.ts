export const userRoles = [
  "DONOR",
  "VERIFICATION_OFFICER",
  "BUSINESS_PARTNER",
  "ADMIN",
] as const;

export type UserRole = (typeof userRoles)[number];

export const roleLabels: Record<UserRole, string> = {
  DONOR: "Donor",
  VERIFICATION_OFFICER: "Verification officer",
  BUSINESS_PARTNER: "Business partner",
  ADMIN: "Administrator",
};

export function homeForRole(role: UserRole) {
  switch (role) {
    case "DONOR":
      return "/dashboard";
    case "VERIFICATION_OFFICER":
      return "/verification";
    case "BUSINESS_PARTNER":
      return "/partner";
    case "ADMIN":
      return "/admin";
  }
}

export function roleCanAccess(role: UserRole, allowed: readonly UserRole[]) {
  return allowed.includes(role);
}
