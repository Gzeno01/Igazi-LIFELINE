import type { Metadata } from "next";

import { AccountGate } from "@/components/account/account-gate";
import { AccessForm, RewardRuleForm } from "@/components/account/settings-forms";
import { PageShell } from "@/components/layout/page-shell";
import { roleLabels } from "@/lib/roles";
import { getRewardRule } from "@/server/accounts";
import { requireRoles } from "@/server/current-user";
import { prisma } from "@/server/db";
import { updateBusinessStatusAction } from "@/app/settings/actions";

export const metadata: Metadata = {
  title: "Administration",
};

async function AdminHome() {
  const admin = await requireRoles(["ADMIN"]);
  const [users, logs, points] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { business: true },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
      include: { actor: { select: { email: true } } },
    }),
    getRewardRule(),
  ]);

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Administrator</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Administration
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Signed in as {admin.name}. Role and status changes are checked on the
        server. You cannot change your own access.
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Reward rule</h2>
        <div className="mt-4">
          <RewardRuleForm points={points} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">People</h2>
        <ul className="mt-4 divide-y rounded-xl border bg-card">
          {users.map((user) => (
            <li key={user.id} className="flex flex-col gap-3 px-4 py-4">
              <div>
                <p className="font-medium">
                  {user.name}
                  {user.isDemonstration ? " · Demonstration" : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email} · {roleLabels[user.role]}
                </p>
              </div>
              {user.id === admin.id ? (
                <p className="text-sm text-muted-foreground">This is your account.</p>
              ) : (
                <AccessForm userId={user.id} role={user.role} status={user.status} />
              )}
              {user.business ? (
                <form action={updateBusinessStatusAction} className="flex flex-wrap items-center gap-2">
                  <input type="hidden" name="businessId" value={user.business.id} />
                  <label className="text-sm" htmlFor={`business-${user.business.id}`}>
                    {user.business.businessName}
                  </label>
                  <select
                    id={`business-${user.business.id}`}
                    name="status"
                    defaultValue={user.business.status}
                    className="h-10 rounded-lg border border-input bg-card px-2 text-sm"
                  >
                    <option value="PENDING">Pending approval</option>
                    <option value="APPROVED">Approved</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                  <button
                    type="submit"
                    className="h-10 rounded-lg border px-3 text-sm font-medium"
                  >
                    Save business
                  </button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Recent audit log</h2>
        {logs.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No audit events yet.</p>
        ) : (
          <ul className="mt-4 divide-y rounded-xl border bg-card text-sm">
            {logs.map((log) => (
              <li key={log.id} className="px-4 py-3">
                <p className="font-medium">{log.action}</p>
                <p className="text-muted-foreground">
                  {log.actor?.email ?? "Unknown"} · {log.createdAt.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}

export default function AdminPage() {
  return (
    <AccountGate>
      <AdminHome />
    </AccountGate>
  );
}
