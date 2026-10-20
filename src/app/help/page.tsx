import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Help",
};

const faqs = [
  {
    question: "Does Igazi Lifeline collect blood?",
    answer:
      "No. You donate with a professional blood service. Igazi Lifeline records an authorized confirmation and the reward points that follow from it.",
  },
  {
    question: "When do I earn points?",
    answer:
      "Only after an authorized verification officer confirms a donation reference that has not been used before. Sending a form as a donor does not add points. The planned award is 100 points for one verified donation.",
  },
  {
    question: "Are points money?",
    answer:
      "No. Points are a reward score you can spend on offers inside Igazi Lifeline. They are not cash and they are not a currency you can send to someone else.",
  },
  {
    question: "Is an identity check the same as a donation check?",
    answer:
      "No. Identity verification confirms who you are when a reward requires it. Donation verification confirms that a blood service recorded a donation. One does not replace the other.",
  },
  {
    question: "What personal information is stored on the blockchain?",
    answer:
      "The planned public record stores an anonymous donor reference, a donation or redemption reference, and a point amount. Names, identity documents, and medical or blood-test information stay off the blockchain.",
  },
];

export default function HelpPage() {
  return (
    <PageShell>
      <p className="text-sm font-medium text-primary">Help</p>
      <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Help, questions, and contact
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Igazi Lifeline is a rewards platform for verified blood donors. The
        steps below match the prototype we are building.
      </p>

      <section id="how-it-works" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 max-w-2xl list-decimal space-y-3 ps-5 text-sm leading-6 text-muted-foreground">
          <li>Donate blood with a professional blood service.</li>
          <li>An authorized officer records a unique donation reference.</li>
          <li>An approved, unused reference can earn 100 reward points.</li>
          <li>You browse offers and redeem points with a participating business.</li>
        </ol>
        <p className="mt-4 text-sm">
          <Link
            href="/#how-it-works"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            See the overview on the home page
          </Link>
        </p>
      </section>

      <section className="mt-10 max-w-2xl" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-semibold">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-10 max-w-2xl" aria-labelledby="pages-heading">
        <h2 id="pages-heading" className="text-xl font-semibold">
          Pages in this prototype
        </h2>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {[
            ["/register", "Become a donor"],
            ["/login", "Sign in"],
            ["/dashboard", "Donor dashboard"],
            ["/donations", "Donation history"],
            ["/donations/status", "Verification status"],
            ["/rewards", "Rewards"],
            ["/rewards/sample", "Sample reward"],
            ["/redeem", "Redemption"],
            ["/points", "Points history"],
            ["/identity", "Identity verification"],
            ["/partner", "Business dashboard"],
            ["/verification", "Officer verification"],
            ["/admin", "Administration"],
            ["/settings", "Account settings"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-primary underline-offset-4 hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 max-w-2xl" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-xl font-semibold">
          Contact
        </h2>
        <div className="mt-4 rounded-xl border border-warning/40 bg-warning px-4 py-4 text-sm leading-6 text-warning-foreground">
          <p className="font-semibold">Contact form placeholder</p>
          <p className="mt-1">
            Messages are not sent from this prototype. A later version will
            ask for your name, email address, and message. Do not include
            medical details or identity documents.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
