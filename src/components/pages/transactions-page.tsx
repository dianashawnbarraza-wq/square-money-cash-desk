"use client";

import { TRANSACTIONS } from "@/lib/data";
import { signedMoney } from "@/lib/format";
import { useMoney } from "@/lib/store";
import { Row } from "@/ds";
import { Button, PageIntro } from "../ui";

export function TransactionsPage() {
  const { state, confirmSupplies } = useMoney();

  return (
    <div>
      <PageIntro
        title="Transactions"
        kicker="Recent activity. Not a full ledger."
      />
      <ul className="border-y border-line">
        {TRANSACTIONS.map((tx) => (
          <li key={tx.id}>
            <Row
              title={tx.name}
              subtitle={`${tx.date} · ${tx.method}`}
              value={signedMoney(tx.amount)}
              hint={tx.pending ? "Settling" : tx.category}
            />
            {tx.confirmSupplies ? (
              <div className="mb-3 flex flex-col gap-2 rounded-[10px] bg-fill px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
                {state.homeDepotConfirmed ? (
                  <p className="text-[13px] text-emphasis">Filed as Supplies.</p>
                ) : (
                  <>
                    <p className="text-[13px] text-emphasis">Confirm Home Depot as Supplies?</p>
                    <div className="flex gap-2">
                      <Button className="h-8 min-h-8 px-3 text-[13px]" onClick={confirmSupplies}>
                        Yes, Supplies
                      </Button>
                      <Button variant="secondary" className="h-8 min-h-8 px-3 text-[13px]">
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
