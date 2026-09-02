"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BUSINESS, NAV } from "@/lib/data";
import { useMoney } from "@/lib/store";
import { cn } from "./ui";
import { ActSheets } from "./sheets";
import { ToastBar } from "./toast-bar";

function SquareMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#1A1A1A" />
      <rect x="10" y="10" width="12" height="12" rx="3" fill="#FAFAFA" />
    </svg>
  );
}

function NavIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "Overview":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.4" />
          <rect x="13" y="4" width="7" height="4" rx="1.4" />
          <rect x="13" y="10" width="7" height="10" rx="1.4" />
          <rect x="4" y="13" width="7" height="7" rx="1.4" />
        </svg>
      );
    case "Approvals":
      return (
        <svg {...common}>
          <path d="M8 7h11M8 12h11M8 17h7" />
          <path d="M5 7.2l.8.8 1.6-1.8" />
        </svg>
      );
    case "Accounts":
      return (
        <svg {...common}>
          <rect x="3.5" y="7" width="17" height="12" rx="2" />
          <path d="M3.5 11h17" />
        </svg>
      );
    case "Transactions":
      return (
        <svg {...common}>
          <path d="M8 7h12M8 12h12M8 17h8" />
          <circle cx="5" cy="7" r="0.9" fill="currentColor" />
          <circle cx="5" cy="12" r="0.9" fill="currentColor" />
          <circle cx="5" cy="17" r="0.9" fill="currentColor" />
        </svg>
      );
    case "Bill pay":
      return (
        <svg {...common}>
          <path d="M7 4.5h10a2 2 0 0 1 2 2V19l-3.2-1.6L12.6 19 9.4 17.4 6 19V6.5a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "Wallet":
      return (
        <svg {...common}>
          <rect x="3.5" y="6" width="17" height="12.5" rx="2" />
          <path d="M16 12.2h3.4" />
        </svg>
      );
    case "Plan":
      return (
        <svg {...common}>
          <path d="M12 4.5 20 8.2v7.6L12 19.5 4 15.8V8.2L12 4.5Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M5 8h14M5 12h14M5 16h8" />
        </svg>
      );
  }
}

function NavLinks({
  onNavigate,
  openCount,
}: {
  onNavigate?: () => void;
  openCount: number;
}) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Money">
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-[10px] px-3 py-2 text-[14px] transition-colors",
              active ? "bg-[#EAF3FF] text-ink" : "text-[#444] hover:bg-[#F2F2F2]",
            )}
          >
            <span className={active ? "text-ink" : "text-muted"}>
              <NavIcon name={item.label} />
            </span>
            <span className="flex-1">{item.label}</span>
            {"badge" in item && item.badge && openCount > 0 ? (
              <span className="text-[13px] text-muted">· {openCount}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { openCount } = useMoney();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-page">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <aside className="fixed inset-y-0 left-0 z-20 hidden w-sidebar flex-col border-r border-line bg-surface px-4 py-5 md:flex">
        <Link href="/" className="mb-8 flex items-start gap-2.5 px-2">
          <SquareMark className="mt-0.5 h-7 w-7" />
          <span>
            <span className="block text-[15px] font-medium leading-tight text-ink">
              {BUSINESS.product}
            </span>
            <span className="block text-[12px] leading-tight text-muted">
              {BUSINESS.shortName}
            </span>
          </span>
        </Link>
        <NavLinks openCount={openCount} />
        <p className="mt-auto px-2 text-[12px] leading-relaxed text-muted">
          Propose, show evidence, then you confirm. Nothing moves on its own.
        </p>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-surface/95 px-4 py-3 backdrop-blur md:hidden">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#F2F2F2]"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2">
          <SquareMark className="h-6 w-6" />
          <span className="text-[14px] font-medium">{BUSINESS.desk}</span>
        </Link>
        <Link
          href="/approvals"
          className="flex h-10 items-center rounded-full px-3 text-[13px] text-ink"
        >
          {openCount > 0 ? `${openCount} need you` : "Clear"}
        </Link>
      </header>

      {open ? (
        <div className="fixed inset-0 z-20 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/25"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(280px,86vw)] flex-col bg-surface px-4 py-5 shadow-xl">
            <div className="mb-6 flex items-center gap-2.5 px-2">
              <SquareMark className="h-7 w-7" />
              <div>
                <div className="text-[15px] font-medium">{BUSINESS.product}</div>
                <div className="text-[12px] text-muted">{BUSINESS.name}</div>
              </div>
            </div>
            <NavLinks openCount={openCount} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="md:pl-sidebar">
        <main id="main" className="mx-auto w-full max-w-[760px] px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
      </div>

      <ActSheets />
      <ToastBar />
    </div>
  );
}
