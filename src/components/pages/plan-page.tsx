"use client";

import { BUSINESS } from "@/lib/data";
import { Card, PageIntro } from "../ui";

export function PlanPage() {
  return (
    <div>
      <PageIntro title="Plan" kicker={`${BUSINESS.name} on Square Money.`} />
      <Card>
        <div className="text-[13px] text-muted">This business</div>
        <h2 className="mt-1 text-[20px] font-medium text-ink">Square Checking + Tax folder</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          About 25 people on Friday payroll. Money in from Square POS and commercial invoices.
          Money out by Bill Pay, Square Payroll, debit and credit cards, and transfers between Checking and Tax Savings.
        </p>
        <ul className="mt-5 space-y-2 text-[14px] text-ink">
          <li>Checking is what you can spend.</li>
          <li>Settling POS is not spendable for 1-2 days.</li>
          <li>Rules never move money without a confirm when the amount is a decision.</li>
        </ul>
      </Card>
    </div>
  );
}
