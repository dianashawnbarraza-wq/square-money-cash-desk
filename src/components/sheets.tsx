"use client";

import { useEffect, useState } from "react";
import {
  MAYA_USED,
  OAK_STREET,
  PAYROLL_AMOUNT,
  SETTLING,
  TAX_APY,
  WILLOW_LANE,
} from "@/lib/data";
import { clampAmount, money, parseAmount } from "@/lib/format";
import { MAYA_CAP_DEFAULT, TAX_SWEEP_DEFAULT, useMoney } from "@/lib/store";
import { AmountField, Button, EvidenceStrip, cn } from "./ui";
import type { PayrollChoice } from "@/lib/types";

function SheetFrame({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-ink/30"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-[20px] bg-surface p-5 shadow-2xl sm:max-w-[440px] sm:rounded-[20px] sm:p-6"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="sheet-title" className="text-[20px] font-medium tracking-tight text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-[#F2F2F2] hover:text-ink"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Blast({ children, ok = true }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <p
      className={cn(
        "rounded-[10px] px-3.5 py-3 text-[13px] leading-relaxed",
        ok ? "bg-[#F4F4F4] text-ink" : "bg-[#FDECEC] text-[#8A1F1F]",
      )}
    >
      {children}
    </p>
  );
}

function MoveTaxSheet() {
  const { state, closeSheet, confirmTax, watch } = useMoney();
  const [raw, setRaw] = useState(new Intl.NumberFormat("en-US").format(TAX_SWEEP_DEFAULT));
  const amount = clampAmount(parseAmount(raw));
  const after = state.checking - amount;
  const covered = after >= PAYROLL_AMOUNT;
  const valid = amount > 0 && amount <= state.checking;

  return (
    <SheetFrame title="Move to Tax Savings" onClose={closeSheet}>
      <div className="space-y-5">
        <AmountField id="tax-amount" label="Amount" value={raw} onChange={setRaw} />
        <div className="flex items-center justify-between rounded-[10px] border border-line px-3.5 py-3 text-[13px]">
          <span className="text-muted">From Checking</span>
          <span className="text-ink">to Tax Savings · {TAX_APY}% APY</span>
        </div>
        <Blast ok={covered}>
          Checking after move: {money(after)} · Payroll Fri needs {money(PAYROLL_AMOUNT)}{" "}
          {covered ? "✓ covered" : "· not covered"}
        </Blast>
        <p className="text-[13px] text-muted">
          Nothing moves until you confirm. You can undo for 30 seconds.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" disabled={!valid} onClick={() => confirmTax(amount)}>
            Confirm move
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() =>
              watch(
                "tax-sweep",
                "Watching through Friday",
                "Nothing moved. We'll bring this back after payroll if leftover is still there.",
                "Watching through Friday. Nothing moved.",
              )
            }
          >
            Watch through payroll
          </Button>
        </div>
      </div>
    </SheetFrame>
  );
}

function MayaCapSheet() {
  const { state, closeSheet, confirmMaya } = useMoney();
  const [raw, setRaw] = useState(
    new Intl.NumberFormat("en-US").format(state.mayaCap ?? MAYA_CAP_DEFAULT),
  );
  const amount = clampAmount(parseAmount(raw));
  const remaining = Math.max(0, amount - MAYA_USED);

  return (
    <SheetFrame title="Cap Maya's debit" onClose={closeSheet}>
      <div className="space-y-5">
        <AmountField
          id="maya-cap"
          label="Monthly cap"
          value={raw}
          onChange={setRaw}
          suffix="/mo"
        />
        <EvidenceStrip
          rows={[
            { label: "Maya Chen", value: "····7741", hint: "Square debit" },
            { label: "Used this month", value: money(MAYA_USED, { cents: true }) },
            { label: "Home Depot", value: "$186.40", hint: "yesterday" },
            { label: "Ferguson", value: "$2,600", hint: "Aug 28" },
          ]}
        />
        <Blast>
          Charges over {money(amount)} this month pause and come here. Maya has{" "}
          {money(remaining)} left under this cap. Existing spend stays as-is.
        </Blast>
        <p className="text-[13px] text-muted">
          This does not move money. It only pauses over-cap charges for your review.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" disabled={amount <= 0} onClick={() => confirmMaya(amount)}>
            Set {money(amount)} cap
          </Button>
          <Button variant="secondary" className="flex-1" onClick={closeSheet}>
            Not now
          </Button>
        </div>
      </div>
    </SheetFrame>
  );
}

function PayrollSheet() {
  const { state, closeSheet, confirmPayroll } = useMoney();
  const [choice, setChoice] = useState<PayrollChoice>("chase");
  const savingsAfter = state.savings - OAK_STREET;

  return (
    <SheetFrame title="Review payroll Friday" onClose={closeSheet}>
      <div className="space-y-5">
        <p className="text-[14px] leading-relaxed text-muted">
          {money(PAYROLL_AMOUNT)} leaves Checking on Friday. Choose how you want to cover the cushion.
        </p>
        <div className="overflow-hidden rounded-[10px] border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#F7F7F7] text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Item</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Oak Street invoice", money(OAK_STREET), "Outstanding · Aug 5"],
                ["Willow Lane", money(WILLOW_LANE), "Outstanding · Aug 12"],
                ["Settling POS", money(SETTLING), "1-2 days"],
                ["Payroll Fri", `−${money(PAYROLL_AMOUNT)}`, "Needs Checking"],
              ].map(([label, amount, hint]) => (
                <tr key={label} className="border-t border-line">
                  <td className="px-3 py-2.5">
                    <div className="text-ink">{label}</div>
                    <div className="text-[12px] text-muted">{hint}</div>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-[13px] text-muted">Choose an action</legend>
          {(
            [
              {
                id: "chase" as const,
                title: "Chase invoices",
                body: "Send a nudge to Oak Street and Willow Lane. Nothing leaves Savings.",
              },
              {
                id: "move-savings" as const,
                title: `Move ${money(OAK_STREET)} from Savings`,
                body: `Adds ${money(OAK_STREET)} to Checking today. Savings after: ${money(savingsAfter)}.`,
              },
            ]
          ).map((option) => (
            <label
              key={option.id}
              className={cn(
                "block cursor-pointer rounded-[12px] border px-3.5 py-3",
                choice === option.id ? "border-ink bg-[#FAFAFA]" : "border-line",
              )}
            >
              <input
                type="radio"
                name="payroll-choice"
                className="sr-only"
                checked={choice === option.id}
                onChange={() => setChoice(option.id)}
              />
              <div className="text-[14px] font-medium text-ink">{option.title}</div>
              <div className="mt-1 text-[13px] text-muted">{option.body}</div>
            </label>
          ))}
        </fieldset>

        <Blast>
          Confirming will {choice === "chase" ? "send nudges only" : `move ${money(OAK_STREET)} from Savings to Checking`}.
          You can undo a Savings move for 30 seconds.
        </Blast>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" onClick={() => confirmPayroll(choice)}>
            Confirm
          </Button>
          <Button variant="secondary" className="flex-1" onClick={closeSheet}>
            Close
          </Button>
        </div>
      </div>
    </SheetFrame>
  );
}

function TaxFolderSheet() {
  const { state, closeSheet, setTaxFolder } = useMoney();
  const [raw, setRaw] = useState(String(state.taxFolderPercent));
  const percent = clampAmount(parseAmount(raw));

  return (
    <SheetFrame title="Edit Tax Savings folder" onClose={closeSheet}>
      <div className="space-y-5">
        <AmountField
          id="tax-percent"
          label="Percent of every deposit"
          value={raw}
          onChange={setRaw}
          prefix=""
          suffix="%"
        />
        <Blast>
          Next deposit will move {percent}% into Tax Savings. Last ran Aug 25. Nothing moves on this save.
        </Blast>
        <Button className="w-full" disabled={percent <= 0} onClick={() => setTaxFolder({ percent })}>
          Save percent
        </Button>
      </div>
    </SheetFrame>
  );
}

function SimpleActSheet({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { closeSheet } = useMoney();
  return (
    <SheetFrame title={title} onClose={closeSheet}>
      <p className="text-[14px] leading-relaxed text-muted">{body}</p>
      <p className="mt-4 text-[13px] text-muted">
        Money-out decisions this week live in Approvals so you can see evidence first.
      </p>
      <Button className="mt-5 w-full" onClick={closeSheet}>
        Close
      </Button>
    </SheetFrame>
  );
}

export function ActSheets() {
  const { state } = useMoney();
  if (!state.sheet) return null;
  switch (state.sheet.kind) {
    case "move-tax":
      return <MoveTaxSheet />;
    case "maya-cap":
    case "maya-edit":
      return <MayaCapSheet />;
    case "payroll":
      return <PayrollSheet />;
    case "tax-folder":
      return <TaxFolderSheet />;
    case "transfer":
      return (
        <SimpleActSheet
          title="Transfer"
          body="For this week, the leftover move is the $2,000 Tax Savings sweep. Open it from Approvals so you can see payroll coverage before anything leaves Checking."
        />
      );
    case "deposit":
      return (
        <SimpleActSheet
          title="Deposit"
          body="Morning POS batch is already in Settling: $8,200, 1-2 days. Check deposits you take in the field will show here after they scan."
        />
      );
    default:
      return null;
  }
}
