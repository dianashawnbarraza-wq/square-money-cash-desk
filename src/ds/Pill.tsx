import type { ReactNode } from "react";
import type { TagTone } from "@/lib/types";
import { cn } from "./cn";

export function Pill({
  tone = "neutral",
  children,
}: {
  tone?: TagTone | "neutral";
  children: ReactNode;
}) {
  const styles: Record<TagTone | "neutral", string> = {
    watch: "bg-watch-bg text-watch-fg",
    grow: "bg-grow-bg text-grow-fg",
    learn: "bg-learn-bg text-learn-fg",
    act: "bg-act-bg text-act-fg",
    neutral: "bg-fill text-emphasis",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-[12px] font-medium tracking-[0.01em]",
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}
