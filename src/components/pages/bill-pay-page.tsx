"use client";

import { BILLS } from "@/lib/data";
import { money } from "@/lib/format";
import { Card, PageIntro, Tag } from "../ui";

export function BillPayPage() {
  return (
    <div>
      <PageIntro
        title="Bill pay"
        kicker="Scheduled outflows for this week. Payroll is already on Friday."
      />
      <div className="space-y-3">
        {BILLS.map((bill) => (
          <Card key={bill.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[15px] font-medium text-ink">{bill.vendor}</div>
              <div className="mt-1 text-[13px] text-muted">
                {bill.due} · {bill.method}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag>
                {bill.status === "scheduled"
                  ? "Scheduled"
                  : bill.status === "due"
                    ? "Due"
                    : "Paid"}
              </Tag>
              <div className="w-24 text-right tabular-nums text-[15px]">{money(bill.amount)}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
