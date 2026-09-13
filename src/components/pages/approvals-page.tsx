"use client";

import { BUSINESS } from "@/lib/data";
import { useMoney } from "@/lib/store";
import { ApprovalCard } from "../approvals";
import { PageIntro } from "../ui";

export function ApprovalsPage() {
  const { catalog, openCount } = useMoney();

  return (
    <div>
      <PageIntro
        title="Approvals"
        kicker={
          openCount > 0
            ? `${openCount} need you · oldest first · ${BUSINESS.freshness.toLowerCase()}`
            : `Nothing waiting · ${BUSINESS.freshness.toLowerCase()}`
        }
      />
      <div className="space-y-4">
        {catalog.map((item) => (
          <ApprovalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
