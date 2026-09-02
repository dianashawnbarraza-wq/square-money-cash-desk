"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BUSINESS,
  COMMITTED,
  INCOMING,
  SETTLING,
  UPCOMING,
} from "@/lib/data";
import { money, signedMoney } from "@/lib/format";
import { useMoney } from "@/lib/store";
import { ApprovalCard } from "../approvals";
import { Button, Card } from "../ui";

export function OverviewPage() {
  const router = useRouter();
  const { state, catalog, openCount, openSheet, addChaseOak } = useMoney();
  const firstOpen = catalog.find((item) => {
    const runtime = state.approvals[item.id];
    return !runtime || runtime.status === "open";
  });

  return (
    <div>
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[32px] font-medium tracking-tight text-ink sm:text-[36px]">
            {BUSINESS.desk}
          </h1>
          <p className="mt-1 text-[14px] text-muted">{BUSINESS.freshness}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => openSheet("transfer")}>
            Transfer
          </Button>
          <Button variant="secondary" onClick={() => openSheet("deposit")}>
            Deposit
          </Button>
          <Button variant="secondary" onClick={() => router.push("/bill-pay")}>
            Upload bill
          </Button>
          <Button onClick={() => router.push("/bill-pay")}>Pay</Button>
        </div>
      </header>

      <section className="mb-12">
        <p className="text-[13px] text-muted">Available to spend</p>
        <p className="mt-1 text-[56px] font-medium leading-none tracking-tight tabular-nums text-ink sm:text-[64px]">
          {money(state.checking)}
        </p>
        <p className="mt-3 text-[14px] text-muted">Checking · spendable now</p>
      </section>

      <section className="mb-12 grid grid-cols-1 gap-6 border-y border-line py-6 sm:grid-cols-3 sm:gap-8">
        <QuietStat
          label="Settling"
          value={money(SETTLING)}
          hint="POS batches · 1-2 days"
        />
        <QuietStat
          label="Committed"
          value={money(COMMITTED)}
          hint="4 bills + payroll Fri"
        />
        <QuietStat
          label="Incoming"
          value={money(INCOMING)}
          hint="2 invoices outstanding"
        />
      </section>

      <section className="mb-12">
        <p className="text-[13px] text-muted">Today</p>
        <p className="mt-2 text-[18px] leading-snug text-ink">
          Payroll Friday: covered if Oak Street lands
        </p>
      </section>

      <section className="mb-12">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[16px] font-medium text-ink">Upcoming</h2>
          <span className="text-[13px] text-muted">Next 3 outflows</span>
        </div>
        <ul>
          {UPCOMING.map((item) => (
            <li
              key={item.id}
              className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0"
            >
              <div>
                <div className="text-[14px] text-ink">{item.name}</div>
                <div className="text-[13px] text-muted">{item.when}</div>
              </div>
              <div className="tabular-nums text-[14px] text-ink">
                {signedMoney(item.amount)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        {openCount > 0 && firstOpen ? (
          <Card className="p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-[16px] font-medium text-ink">
                {openCount} need you
              </h2>
              <Link href="/approvals" className="text-[14px] text-square hover:underline">
                Open Approvals
              </Link>
            </div>
            <ApprovalCard item={firstOpen} compact framed={false} />
          </Card>
        ) : (
          <Card>
            <h2 className="text-[16px] font-medium text-ink">You&apos;re clear through Friday</h2>
            <p className="mt-2 text-[14px] text-muted">
              Nothing needs a decision before payroll. Checking is {money(state.checking)}.
            </p>
          </Card>
        )}
      </section>

      <section>
        <p className="mb-3 text-[13px] text-muted">Start a decision</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              addChaseOak();
              router.push("/approvals");
            }}
          >
            Chase Oak Street
          </Button>
          <Button variant="secondary" onClick={() => openSheet("move-tax")}>
            Move leftover to tax
          </Button>
          <Button variant="secondary" onClick={() => openSheet("maya-cap")}>
            Cap Maya&apos;s card
          </Button>
        </div>
      </section>
    </div>
  );
}

function QuietStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div>
      <div className="text-[13px] text-muted">{label}</div>
      <div className="mt-1 text-[22px] font-medium tabular-nums tracking-tight text-ink">
        {value}
      </div>
      <div className="mt-1 text-[13px] text-muted">{hint}</div>
    </div>
  );
}
