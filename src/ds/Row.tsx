import type { ReactNode } from "react";
import { cn } from "./cn";

export function Row({
  title,
  subtitle,
  value,
  hint,
  className,
}: {
  title: string;
  subtitle?: string;
  value?: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="text-[14px] text-emphasis">{title}</div>
        {subtitle ? <div className="mt-0.5 text-[13px] text-muted">{subtitle}</div> : null}
      </div>
      <div className="shrink-0 text-right">
        {value != null ? (
          <div className="tabular-nums text-[14px] text-emphasis">{value}</div>
        ) : null}
        {hint ? <div className="mt-0.5 text-[13px] text-muted">{hint}</div> : null}
      </div>
    </div>
  );
}
