"use client";

import { useMoney } from "@/lib/store";
import type { Approval } from "@/lib/types";
import { Button, Card, EvidenceStrip, Tag, cn } from "./ui";

export function ApprovalCard({
  item,
  compact = false,
  framed = true,
}: {
  item: Approval;
  compact?: boolean;
  framed?: boolean;
}) {
  const { state, openSheet, watch, confirmChaseOak } = useMoney();
  const runtime = state.approvals[item.id] ?? { status: "open" as const };
  const resolved = runtime.status === "confirmed" || runtime.status === "watching";

  const onPrimary = () => {
    if (item.id === "chase-oak") {
      confirmChaseOak();
      return;
    }
    if (item.primarySheet) openSheet(item.primarySheet);
  };

  const onSecondary = () => {
    if (item.id === "payroll") {
      watch(
        "payroll",
        "Watching through Friday",
        "Nothing moved. We'll check again after the morning POS batch on Friday.",
        "Watching through Friday. Nothing moved.",
      );
      return;
    }
    if (item.id === "tax-sweep") {
      openSheet("move-tax");
      return;
    }
    if (item.id === "maya-cap") {
      openSheet("maya-cap");
      return;
    }
    if (item.id === "chase-oak") {
      watch(
        "chase-oak",
        "Held for later",
        "No nudge sent. Oak Street stays on the incoming list.",
        "Held. Nothing sent.",
      );
    }
  };

  const inner = (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Tag tone={item.tone}>{item.tag}</Tag>
        {runtime.status === "watching" ? (
          <span className="text-[12px] text-muted">Watching</span>
        ) : null}
        {runtime.status === "confirmed" ? (
          <span className="text-[12px] text-muted">Done</span>
        ) : null}
      </div>
      <h3
        className={cn(
          "text-[18px] font-medium tracking-tight text-ink",
          runtime.status === "confirmed" && "text-muted line-through decoration-muted/70",
        )}
      >
        {item.title}
        {item.amountLabel ? (
          <span className="text-muted"> · {item.amountLabel}</span>
        ) : null}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.why}</p>
      {!compact ? (
        <div className="mt-4">
          <EvidenceStrip rows={item.evidence} />
        </div>
      ) : (
        <ul className="mt-3 space-y-1 text-[13px] text-muted">
          {item.evidence.slice(0, 2).map((row) => (
            <li key={row.label}>
              {row.label} · {row.value}
              {row.hint ? ` · ${row.hint}` : ""}
            </li>
          ))}
        </ul>
      )}
      {runtime.status === "open" && !compact ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button className="sm:flex-1" onClick={onPrimary}>
            {item.primary}
          </Button>
          <Button variant="secondary" className="sm:flex-1" onClick={onSecondary}>
            {item.secondary}
          </Button>
        </div>
      ) : null}
      {resolved && runtime.outcomeTitle ? (
        <div className="mt-4 rounded-[10px] border border-line bg-white px-3.5 py-3">
          <div className="text-[14px] font-medium text-ink">{runtime.outcomeTitle}</div>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">{runtime.outcomeBody}</p>
        </div>
      ) : null}
    </>
  );

  if (!framed) return <div>{inner}</div>;
  return <Card className={cn(resolved && "bg-[#FBFBFB]")}>{inner}</Card>;
}
