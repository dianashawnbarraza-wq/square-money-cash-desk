"use client";

import { TRANSACTIONS } from "@/lib/data";
import { signedMoney } from "@/lib/format";
import { useMoney } from "@/lib/store";
import { Button, PageIntro } from "../ui";

export function TransactionsPage() {
  const { state, confirmSupplies } = useMoney();

  return (
    <div>
      <PageIntro
        title="Transactions"
        kicker="Recent activity. Not a full ledger."
      />
      <ul className="divide-y divide-line border-y border-line">
        {TRANSACTIONS.map((tx) => (
          <li key={tx.id} className="py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[15px] text-ink">{tx.name}</div>
                <div className="mt-1 text-[13px] text-muted">
                  {tx.date} · {tx.method}
                </div>
                {tx.category ? (
                  <div className="mt-1 text-[12px] text-muted">{tx.category}</div>
                ) : null}
                {tx.pending ? (
                  <div className="mt-1 text-[12px] text-muted">Settling</div>
                ) : null}
              </div>
              <div className="tabular-nums text-[15px] text-ink">{signedMoney(tx.amount)}</div>
            </div>
            {tx.confirmSupplies ? (
              <div className="mt-3 flex flex-col gap-2 rounded-[10px] bg-[#F4F4F4] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
                {state.homeDepotConfirmed ? (
                  <p className="text-[13px] text-ink">Filed as Supplies.</p>
                ) : (
                  <>
                    <p className="text-[13px] text-ink">Confirm Home Depot as Supplies?</p>
                    <div className="flex gap-2">
                      <Button className="h-8 px-3 text-[13px]" onClick={confirmSupplies}>
                        Yes, Supplies
                      </Button>
                      <Button variant="secondary" className="h-8 px-3 text-[13px]">
                        Not now
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
