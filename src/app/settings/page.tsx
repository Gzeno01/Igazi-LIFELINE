import type { Metadata } from "next";

import { AccountGate } from "@/components/account/account-gate";
import { PasswordForm, ProfileForm } from "@/components/account/settings-forms";
import { PageShell } from "@/components/layout/page-shell";
import { roleLabels } from "@/lib/roles";
import { requireUser } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Account settings",
};

async function SettingsScreen() {
  const user = await requireUser();

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Account</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Profile and settings
      </h1>
      <dl className="mt-6 max-w-md text-sm leading-6">
        <div className="flex justify-between gap-4 border-b py-2">
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b py-2">
          <dt>Role</dt>
          <dd>{roleLabels[user.role]}</dd>
        </div>
      </dl>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Name</h2>
        <div className="mt-4">
          <ProfileForm name={user.name} />
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Password</h2>
        <div className="mt-4">
          <PasswordForm />
        </div>
      </section>
    </PageShell>
  );
}

export default function SettingsPage() {
  return (
    <AccountGate>
      <SettingsScreen />
    </AccountGate>
  );
}
