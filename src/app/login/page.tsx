import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AccountLoading } from "@/components/account/account-loading";
import { LoginForm } from "@/components/account/auth-forms";
import { PageShell } from "@/components/layout/page-shell";
import { homeForRole } from "@/lib/roles";
import { getCurrentUser } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Sign in",
};

async function LoginScreen() {
  const user = await getCurrentUser();
  if (user) {
    redirect(homeForRole(user.role));
  }

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Sign in</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Sign in
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Donors, verification officers, business partners, and administrators
        each open their own area after signing in.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
      <p className="mt-6 text-sm">
        New here?{" "}
        <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
          Become a donor
        </Link>
      </p>
    </PageShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AccountLoading label="Loading sign in…" />}>
      <LoginScreen />
    </Suspense>
  );
}
