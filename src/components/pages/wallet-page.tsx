"use client";

import { CARDS, MAYA_USED } from "@/lib/data";
import { money } from "@/lib/format";
import { useMoney } from "@/lib/store";
import { Button, Card, PageIntro } from "../ui";

export function WalletPage() {
  const { state, openSheet, removeMaya } = useMoney();

  return (
    <div>
      <PageIntro
        title="Wallet"
        kicker="Square debit for the shop. Outside cards stay visible, not controlled."
      />
      <div className="space-y-3">
        {CARDS.map((card) => {
          const isMaya = card.id === "maya";
          const cap = isMaya ? state.mayaCap : undefined;
          return (
            <Card key={card.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[15px] font-medium text-ink">{card.holder}</div>
                  <div className="mt-1 text-[13px] text-muted">
                    {card.network} · ····{card.last4}
                  </div>
                  <div className="mt-1 text-[12px] text-muted">{card.kind}</div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] text-muted">This month</div>
                  <div className="tabular-nums text-[16px] font-medium">
                    {money(isMaya ? MAYA_USED : card.spentThisMonth, {
                      cents: isMaya,
                    })}
                  </div>
                </div>
              </div>
              {isMaya ? (
                <div className="mt-4 rounded-[10px] bg-fill px-3.5 py-3">
                  {cap != null ? (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[13px] text-ink">
                        Cap {money(cap)}/mo · used {money(MAYA_USED)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          className="h-8 px-3 text-[13px]"
                          onClick={() => openSheet("maya-edit")}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          className="h-8 px-3 text-[13px]"
                          onClick={removeMaya}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[13px] text-ink">No monthly cap yet.</p>
                      <Button
                        className="h-8 px-3 text-[13px]"
                        onClick={() => openSheet("maya-cap")}
                      >
                        Set a cap
                      </Button>
                    </div>
                  )}
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
