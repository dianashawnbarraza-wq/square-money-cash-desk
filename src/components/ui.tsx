import type { ReactNode } from "react";
import { formatAmountInput } from "@/lib/format";
import type { TagTone } from "@/lib/types";
import { Button, Pill, cn } from "@/ds";

export { Button, cn };
export { Pill as Tag };

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-card border border-line bg-surface",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function EvidenceStrip({
  rows,
}: {
  rows: { label: string; value: string; hint?: string }[];
}) {
  return (
    <ul className="overflow-hidden rounded-[10px] bg-fill">
      {rows.map((row, i) => (
        <li
          key={`${row.label}-${i}`}
          className={cn(
            "flex items-baseline justify-between gap-4 px-3.5 py-2.5 text-[13px]",
            i > 0 && "border-t border-line/80",
          )}
        >
          <span className="min-w-0 text-muted">
            {row.label}
            {row.hint ? <span className="text-faint"> · {row.hint}</span> : null}
          </span>
          <span className="shrink-0 tabular-nums text-emphasis">{row.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function AmountField({
  id,
  label,
  value,
  onChange,
  suffix,
  prefix = "$",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  suffix?: string;
  prefix?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[13px] text-muted">{label}</span>
      <div className="flex items-center gap-2 rounded-card border border-line bg-page px-4 py-3 focus-within:border-emphasis">
        {prefix ? <span className="text-[28px] font-medium text-muted">{prefix}</span> : null}
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(formatAmountInput(e.target.value))}
          className="w-full bg-transparent text-[28px] font-medium tabular-nums text-emphasis outline-none"
        />
        {suffix ? <span className="text-[14px] text-muted">{suffix}</span> : null}
      </div>
    </label>
  );
}

export function PageIntro({
  title,
  kicker,
  actions,
}: {
  title: string;
  kicker?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-[28px] font-medium tracking-tight text-emphasis sm:text-[32px]">
          {title}
        </h1>
        {kicker ? <p className="mt-1 text-[14px] text-muted">{kicker}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

export type { TagTone };
