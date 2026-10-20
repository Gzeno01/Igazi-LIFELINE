# Igazi Lifeline

Igazi Lifeline is a blood donation rewards website. People donate with a professional blood service. After an authorized confirmation, donors earn reward points they can redeem at participating businesses.

This repository is the first prototype shell: the public pages, navigation, and visual identity. Accounts, the database, donation verification, and the Stellar contract are not built yet.

The application does not collect blood.

## What works now

- Landing page with the actions Become a Donor, Explore Rewards, and How It Works.
- Help, questions, and a contact section that does not send messages.
- A rewards page with one clearly labelled sample offer. It is not a real business and cannot be redeemed.
- Placeholder pages for sign-in, dashboards, donation history, points, identity, and administration.

## What is not connected yet

- Registration and sign-in.
- Donation records and officer verification.
- Point balances and redemption.
- Identity verification. No documents are collected.
- Stellar testnet and the Soroban contract.

Planned reward rule, still not enforced: one verified donation earns 100 points. Points are a reward score, not cash.

## Requirements

- Node.js 20 or newer. This project was created with Node.js 25.2.1.
- npm 11.

## Commands

Install dependencies:

```bash
npm install
```

This downloads the Next.js, React, Tailwind CSS, and shadcn/ui packages listed in `package-lock.json`.

Start the site on your computer:

```bash
npm run dev
```

This starts the Next.js development server. Open http://localhost:3000.

Check the code for the lint rules included with Next.js:

```bash
npm run lint
```

Build the production site:

```bash
npm run build
```

This compiles the pages and reports type or build errors. There is no automated test suite in this phase.

## Versions used

- Next.js 16.4.2
- React 19.3.0
- Tailwind CSS 4
- shadcn/ui CLI, style `radix-nova`

Package versions were taken from the current Next.js and shadcn installers when this shell was created.
