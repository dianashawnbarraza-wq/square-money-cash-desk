import type { ReactNode } from "react";
import type { TagTone } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Tag({ tone, children }: { tone: TagTone; children: ReactNode }) {
  const styles: Record<TagTone, string> = {
    watch: "bg-watch-bg text-watch-fg",
    grow: "bg-grow-bg text-grow-fg",
    learn: "bg-learn-bg text-learn-fg",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium tracking-[0.01em]",
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  className,
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "link";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const variants = {
    primary:
      "bg-ink text-white hover:bg-[#2b2b2b] disabled:bg-[#c8c8c8] disabled:text-white",
    secondary:
      "bg-surface text-ink border border-ink/80 hover:bg-[#f4f4f4] disabled:opacity-40",
    ghost: "bg-transparent text-ink hover:bg-[#f0f0f0]",
    link: "bg-transparent text-square px-0 h-auto rounded-none hover:underline",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-full px-4 text-[14px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

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
    <ul className="overflow-hidden rounded-[10px] bg-[#F4F4F4]">
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
            {row.hint ? <span className="text-muted/80"> · {row.hint}</span> : null}
          </span>
          <span className="shrink-0 tabular-nums text-ink">{row.value}</span>
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
      <div className="flex items-center gap-2 rounded-[12px] border border-line bg-page px-4 py-3 focus-within:border-ink">
        {prefix ? <span className="text-[28px] font-medium text-muted">{prefix}</span> : null}
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-[28px] font-medium tabular-nums text-ink outline-none"
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
        <h1 className="text-[28px] font-medium tracking-tight text-ink sm:text-[32px]">
          {title}
        </h1>
        {kicker ? <p className="mt-1 text-[14px] text-muted">{kicker}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
