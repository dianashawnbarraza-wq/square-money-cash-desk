"use client";

import { cn } from "./cn";

export function Tabs({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-5 border-b border-line" role="tablist">
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "-mb-px border-b-2 pb-2 text-[14px] font-medium",
              active
                ? "border-emphasis text-emphasis"
                : "border-transparent text-muted hover:text-emphasis",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
