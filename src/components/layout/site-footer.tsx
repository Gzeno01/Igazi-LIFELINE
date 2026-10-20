import Link from "next/link";

const footerLinks = [
  { href: "/help", label: "Help and contact" },
  { href: "/rewards", label: "Rewards" },
  { href: "/register", label: "Become a donor" },
  { href: "/verification", label: "Verification officers" },
  { href: "/partner", label: "Business partners" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="font-semibold">Igazi Lifeline</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A rewards platform for people who donate blood with a professional
              blood service. This application does not collect blood.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Prototype shell. Accounts, donation records, and reward balances are
          not connected yet. Points will be a reward score, not cash.
        </p>
      </div>
    </footer>
  );
}
