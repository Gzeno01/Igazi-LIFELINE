import { describe, expect, it } from "vitest";

import { homeForRole, roleCanAccess } from "@/lib/roles";

describe("roles", () => {
  it("sends each role to its own area", () => {
    expect(homeForRole("DONOR")).toBe("/dashboard");
    expect(homeForRole("VERIFICATION_OFFICER")).toBe("/verification");
    expect(homeForRole("BUSINESS_PARTNER")).toBe("/partner");
    expect(homeForRole("ADMIN")).toBe("/admin");
  });

  it("keeps donors out of officer and admin pages", () => {
    expect(roleCanAccess("DONOR", ["VERIFICATION_OFFICER", "ADMIN"])).toBe(false);
    expect(roleCanAccess("VERIFICATION_OFFICER", ["VERIFICATION_OFFICER", "ADMIN"])).toBe(
      true,
    );
    expect(roleCanAccess("ADMIN", ["ADMIN"])).toBe(true);
  });
});
