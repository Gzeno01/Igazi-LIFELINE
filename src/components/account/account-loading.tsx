import { PageShell } from "@/components/layout/page-shell";

export function AccountLoading({ label }: { label: string }) {
  return (
    <PageShell>
      <p className="text-sm text-muted-foreground">{label}</p>
    </PageShell>
  );
}
