"use client";

import { ACCOUNTS, COMMITTED, INCOMING, SETTLING } from "@/lib/data";
import { money } from "@/lib/format";
import { useMoney } from "@/lib/store";
import { Card, PageIntro } from "../ui";

export function AccountsPage() {
  const { state } = useMoney();
  const live: Record<string, number> = {
    checking: state.checking,
    tax: state.taxSavings,
    savings: state.savings,
    settling: SETTLING,
  };

  return (
    <div>
      <PageIntro
        title="Accounts"
        kicker="Square Checking, folders, and what is still settling."
      />
      <div className="space-y-3">
        {ACCOUNTS.map((account) => (
          <Card key={account.id} className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[16px] font-medium text-ink">{account.name}</div>
              <div className="mt-1 text-[13px] text-muted">{account.detail}</div>
              <div className="mt-1 text-[12px] text-muted">{account.kind}</div>
            </div>
            <div className="text-right text-[18px] font-medium tabular-nums">
              {money(live[account.id] ?? account.balance)}
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-[13px] leading-relaxed text-muted">
        Committed out this week: {money(COMMITTED)}. Incoming invoices: {money(INCOMING)}.
        Available is Checking only. Settling is not spendable yet.
      </p>
    </div>
  );
}
