# Igazi Lifeline

Igazi Lifeline is a blood donation rewards website. People donate with a professional blood service. After an authorized confirmation, donors earn reward points they can redeem at participating businesses.

The application does not collect blood. Points are a reward score, not cash.

## What works now

- Landing page, help, and a labelled sample reward that cannot be redeemed.
- Donor registration and sign-in. The session is an encrypted cookie. Passwords are stored as a salted hash.
- Four roles: donor, verification officer, business partner, and administrator. The server checks the role before opening a protected page.
- Administrators can change another person's role or status, approve or suspend a business, and set how many points a verified donation will earn.
- Account name and password settings.
- PostgreSQL tables for users, donations, rewards, redemptions, identity status, blockchain transaction records, and audit logs.

## What is not connected yet

- Donation verification. Officers can open their page, but they cannot confirm a donation yet, and no points are issued.
- Reward redemption. The sample offer is still a layout example.
- A real identity provider. The identity page shows a status only and does not collect documents.
- Stellar testnet and the Soroban contract.

The starting reward rule is 100 points for one verified donation. An administrator can change it. The rule is stored, and it is not applied until verification is built.

## Requirements

- Node.js 20 or newer. This project was created with Node.js 25.2.1.
- npm 11.
- Docker Desktop, for the local PostgreSQL database.

## Commands

Install dependencies:

```bash
npm install
```

This downloads Next.js, React, Tailwind CSS, shadcn/ui, Prisma, and the other packages in `package-lock.json`.

Start the local database:

```bash
npm run db:up
```

This starts PostgreSQL 17 in Docker. The local username, password, and database name are in `.env.example`. They are for this computer only.

Copy the environment file once, then put a random session password of at least 32 characters in `SESSION_PASSWORD`:

```bash
copy .env.example .env
```

Create the tables:

```bash
npm run db:migrate
```

This creates a migration from `prisma/schema.prisma` and applies it to the local database.

Add the labelled demonstration accounts:

```bash
npm run db:seed
```

This creates four demonstration users. Their password is `Lifeline-demo-100`.

| Email | Role |
| --- | --- |
| donor@demo.lifeline.test | Donor |
| officer@demo.lifeline.test | Verification officer |
| partner@demo.lifeline.test | Business partner |
| admin@demo.lifeline.test | Administrator |

Start the site:

```bash
npm run dev
```

This starts the Next.js development server at http://localhost:3000.

Run the automated tests:

```bash
npm test
```

This checks role rules, registration, duplicate emails, wrong passwords, and suspended accounts. It uses the `igazi_lifeline_test` database, not the one the website uses.

Check lint and compile the site:

```bash
npm run lint
npm run build
```

## Versions

- Next.js 16.4.2
- React 19.3.0
- Tailwind CSS 4
- shadcn/ui, style `radix-nova`
- Prisma ORM 7.10.1 with PostgreSQL
- iron-session 9 for the encrypted sign-in cookie

Prisma ORM 8 is a release candidate and is not used. Install Prisma as `prisma@7` so the project keeps the schema in `prisma/schema.prisma`.

## Data that stays off the blockchain

Names, email addresses, password hashes, and identity status live in PostgreSQL. The identity record stores a status and an optional provider reference. It does not store documents or medical information. Blockchain rows are ready for a later phase and are empty until a contract is deployed.
