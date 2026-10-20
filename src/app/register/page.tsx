import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AccountLoading } from "@/components/account/account-loading";
import { RegisterForm } from "@/components/account/auth-forms";
import { PageShell } from "@/components/layout/page-shell";
import { homeForRole } from "@/lib/roles";
import { getCurrentUser } from "@/server/current-user";

export const metadata: Metadata = {
  title: "Become a donor",
};

async function RegisterScreen() {
  const user = await getCurrentUser();
  if (user) {
    redirect(homeForRole(user.role));
  }

  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Registration</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Become a donor
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Create a donor account. Public registration cannot assign officer,
        business, or administrator access.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
      <p className="mt-6 text-sm">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </PageShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<AccountLoading label="Loading registration…" />}>
      <RegisterScreen />
    </Suspense>
  );
}
