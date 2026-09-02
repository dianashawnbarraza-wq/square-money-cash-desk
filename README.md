# Square Money — Cash Desk

Interactive prototype of **Square Money · Cash Desk** for **Dave's Plumbing & Rooter** (mid-market trades SMB). Built so Diana can click through the 90-second money question: of the money I see, what can I spend, what is settling / committed / incoming, and what needs a decision before Friday?

This is not a chatbot. Agentic work is **propose → evidence → approve/edit**. Nothing moves silently.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

Vercel: import the repo. Framework preset Next.js. Build command `next build` (or `npm run build`).

## Demo path (about 90 seconds)

1. **Overview** — Available to spend is the only hero number. Settling / Committed / Incoming sit underneath. Today line, next 3 outflows, then a "3 need you" teaser.
2. **Approvals** — Oldest first. Open **Move $2,000**, edit the amount, read the Checking / payroll blast radius, confirm. Undo for ~30s. The card strikes through and an outcome card says what held.
3. Set **Maya's debit cap**. Confirm. Check **Wallet** and **Rules**: cap persists, with Edit / Remove.
4. **Review package** on payroll: evidence table, chase invoices or move $4,200 from Savings, confirm.
5. **Transactions**: confirm Home Depot as Supplies.
6. Shrink to ~390px: hamburger nav, no clipped sidebar.

Refresh resets seed data. State lives in memory for the click-through.

## Design notes

- **Overview is calm.** One hero (Available). Breakdown is a quiet row, not four equal cards. No "link your accounts" marketing, no NL chat hero. Intent chips are secondary and only create or open Approvals.
- **Approvals holds the dashboard energy.** Named seller scopes (Payroll Watch, Tax Reserve, Card Guard), evidence strips, primary + secondary CTAs.
- **Trust copy on every ACT.** From / to, blast radius, "nothing moves until you confirm," Undo on money movement.
- **Tone.** Square seller: second person, lead with the number, plain words. No hype, no exclamation points, no em dashes.
- **Money-out levers.** Bill Pay (vendor bill → category), Square Payroll, debit/credit cards, and Transfer between Square Checking and Savings (including Tax Savings). Deposit for money in. Instant P2P send is not a Square Checking rail.
- **Tokens.** Page `#FAFAFA`, surface `#FFFFFF`, ink `#1A1A1A`, muted `#757575`, line `#E5E5E5`. Square blue `#006AFF` for Learn / links only. Primary buttons near-black. Inter. Cards 12px. Buttons pill. Sidebar 240px.

Seed balances and Friday payroll live in `src/lib/data.ts`. Interactive state is `src/lib/store.tsx`.
