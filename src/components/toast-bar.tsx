"use client";

import { useEffect, useState } from "react";
import { useMoney } from "@/lib/store";
import { Button } from "./ui";

export function ToastBar() {
  const { state, undo, dismissToast } = useMoney();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!state.undo) return;
    const t = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(t);
  }, [state.undo]);

  if (!state.toast && !state.undo) return null;

  const seconds = state.undo
    ? Math.max(0, Math.ceil((state.undo.expiresAt - now) / 1000))
    : 0;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-md items-center gap-3 rounded-[14px] bg-emphasis px-4 py-3 text-white shadow-lg">
        <p className="flex-1 text-[13px] leading-snug">
          {state.toast?.message ?? state.undo?.label}
          {state.undo ? (
            <span className="ml-1 text-white/60">{seconds}s</span>
          ) : null}
        </p>
        {state.undo ? (
          <Button
            variant="secondary"
            className="h-8 bg-white px-3 text-[13px]"
            onClick={undo}
          >
            Undo
          </Button>
        ) : (
          <button
            type="button"
            className="text-[13px] text-white/70 hover:text-white"
            onClick={dismissToast}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
