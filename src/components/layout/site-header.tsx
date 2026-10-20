"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplet, Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/rewards", label: "Explore rewards" },
  { href: "/help", label: "Help" },
];

function isCurrent(pathname: string, href: string) {
  if (href.includes("#")) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Droplet aria-hidden="true" className="size-4" />
          </span>
          <span>Igazi Lifeline</span>
        </Link>

        <nav aria-label="Primary" className="ms-6 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                isCurrent(pathname, link.href) && "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" className="h-10 px-3">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild className="h-10 px-4">
            <Link href="/register">Become a Donor</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ms-auto md:hidden"
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Primary links and account actions.</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <SheetClose asChild>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline" }), "h-11")}
                >
                  Sign in
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/register" className={cn(buttonVariants(), "h-11")}>
                  Become a Donor
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
