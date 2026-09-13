"use client";

import { MAYA_USED } from "@/lib/data";
import { money } from "@/lib/format";
import { useMoney } from "@/lib/store";
import { Button, Card, PageIntro } from "../ui";

export function RulesPage() {
  const { state, openSheet, setTaxFolder, removeMaya } = useMoney();

  return (
    <div>
      <PageIntro
        title="Rules"
        kicker="Scoped. Pausable. Every change stays visible here."
      />
      <div className="space-y-4">
        <Card>
          <div className="text-[13px] text-muted">Tax Savings folder</div>
          <h2 className="mt-1 text-[18px] font-medium text-ink">
            Moves {state.taxFolderPercent}% of every deposit
          </h2>
          <p className="mt-2 text-[14px] text-muted">
            Last ran Aug 25 · {state.taxFolderPaused ? "Paused" : "On"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => openSheet("tax-folder")}>
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => setTaxFolder({ paused: !state.taxFolderPaused })}
            >
              {state.taxFolderPaused ? "Resume" : "Pause"}
            </Button>
          </div>
        </Card>

        <Card>
          <div className="text-[13px] text-muted">Card Guard</div>
          {state.mayaCap != null ? (
            <>
              <h2 className="mt-1 text-[18px] font-medium text-ink">
                Cap {money(state.mayaCap)}/mo · used {money(MAYA_USED)}
              </h2>
              <p className="mt-2 text-[14px] text-muted">
                Maya Chen · Square debit ····7741. Over-cap pauses for Approvals.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => openSheet("maya-edit")}>
                  Edit
                </Button>
                <Button variant="secondary" onClick={removeMaya}>
                  Remove
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-1 text-[18px] font-medium text-ink">No Maya cap yet</h2>
              <p className="mt-2 text-[14px] text-muted">
                Proposed in Approvals: $1,000/mo. Nothing is limited until you set it.
              </p>
              <Button className="mt-4" onClick={() => openSheet("maya-cap")}>
                Set $1,000 cap
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
