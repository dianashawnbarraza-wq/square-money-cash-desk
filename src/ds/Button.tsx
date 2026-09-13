import type { ReactNode } from "react";
import { cn } from "./cn";

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
      "min-h-12 bg-emphasis text-white hover:bg-[#2a2a2a] disabled:bg-[#c8c8c8] disabled:text-white",
    secondary:
      "min-h-12 bg-fill text-emphasis hover:bg-[#e8e8e8] disabled:opacity-40",
    ghost: "min-h-12 bg-transparent text-emphasis hover:bg-fill",
    link: "h-auto min-h-0 rounded-none bg-transparent px-0 text-link hover:underline",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-pill px-4 text-[14px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link/35",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
