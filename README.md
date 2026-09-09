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
- **Chrome is monochrome Square Banking / Checking seller.** Tokens live in `src/ds/` (recreated from Checking/SPOS `square-checking-spos` `src/ds`; Origin repo was not cloneable). Emphasis `#101010`, surface `#FFFFFF`, fill/40 `#F0F0F0`, page `#FAFAFA`, line `#E5E5E5`, text at 90/55/30 black. Primary button min-height 48, near-black `#101010`, full pill. Cards radius 12. Sidebar 240. Nav active is gray fill, not blue. Font: Square Sans / Cash Sans with Inter fallback.
- **Color lives only on Approvals semantic pills.** Watch peach `#F8E7C1`/`#C47B17`, Grow green `#D4F0E4`/`#005E5E`, Learn / Act / text links Square seller blue `#005AD9` (not `#006AFF`). Do not gray these tags.

Seed balances and Friday payroll live in `src/lib/data.ts`. Interactive state is `src/lib/store.tsx`.
