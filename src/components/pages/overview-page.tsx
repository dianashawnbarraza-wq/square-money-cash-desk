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
import { Row } from "@/ds";
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
      <header className="mb-10">
        <h1 className="text-[32px] font-medium tracking-tight text-emphasis sm:text-[36px]">
          {BUSINESS.desk}
        </h1>
        <p className="mt-1 text-[14px] text-muted">{BUSINESS.freshness}</p>
      </header>

      <section className="mb-12">
        <p className="text-[13px] text-muted">Available to spend</p>
        <p className="mt-1 text-[56px] font-medium leading-none tracking-tight tabular-nums text-emphasis sm:text-[64px]">
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
        <p className="mt-2 text-[18px] leading-snug text-emphasis">
          Payroll Friday: covered if Oak Street lands
        </p>
      </section>

      <section className="mb-12">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[16px] font-medium text-emphasis">Upcoming</h2>
          <span className="text-[13px] text-muted">Next 3 outflows</span>
        </div>
        <ul>
          {UPCOMING.map((item) => (
            <li key={item.id}>
              <Row
                title={item.name}
                subtitle={item.when}
                value={signedMoney(item.amount)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        {openCount > 0 && firstOpen ? (
          <Card className="flex items-center justify-between gap-4 py-4">
            <p className="text-[16px] font-medium text-emphasis">
              {openCount} need you
            </p>
            <Link href="/approvals" className="text-[14px] text-link hover:underline">
              Open Approvals
            </Link>
          </Card>
        ) : (
          <Card>
            <h2 className="text-[16px] font-medium text-emphasis">You&apos;re clear through Friday</h2>
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
      <div className="mt-1 text-[22px] font-medium tabular-nums tracking-tight text-emphasis">
        {value}
      </div>
      <div className="mt-1 text-[13px] text-muted">{hint}</div>
    </div>
  );
}
