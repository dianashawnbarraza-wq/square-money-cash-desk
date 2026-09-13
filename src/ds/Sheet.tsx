"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "./cn";

export function Sheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
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
        className="absolute inset-0 bg-emphasis/30"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className={cn(
          "relative z-10 max-h-[92dvh] w-full overflow-y-auto bg-surface p-5 shadow-2xl",
          "rounded-t-[24px] sm:max-w-[440px] sm:rounded-[24px] sm:p-6",
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2
            id="sheet-title"
            className="text-[20px] font-medium tracking-tight text-emphasis"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-pill text-muted hover:bg-fill hover:text-emphasis"
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
