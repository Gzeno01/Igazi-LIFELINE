import { Suspense, type ReactNode } from "react";

import { AccountLoading } from "@/components/account/account-loading";

export function AccountGate({
  children,
  label = "Loading your account…",
}: {
  children: ReactNode;
  label?: string;
}) {
  return <Suspense fallback={<AccountLoading label={label} />}>{children}</Suspense>;
}
