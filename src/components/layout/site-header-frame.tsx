import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/server/current-user";

export async function SiteHeaderFrame() {
  const user = await getCurrentUser();
  return (
    <SiteHeader
      account={user ? { name: user.name, role: user.role } : null}
    />
  );
}
