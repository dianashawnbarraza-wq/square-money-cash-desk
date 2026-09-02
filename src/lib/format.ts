export function money(value: number, opts?: { cents?: boolean }): string {
  const showCents = opts?.cents ?? Math.abs(value % 1) > 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  }).format(value);
}

export function signedMoney(value: number): string {
  const abs = money(Math.abs(value), { cents: Math.abs(value % 1) > 0 });
  if (value > 0) return `+${abs}`;
  if (value < 0) return `−${abs}`;
  return abs;
}

export function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return 0;
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function clampAmount(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100) / 100;
}

export function formatAmountInput(raw: string): string {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return "";
  const [whole, fraction] = cleaned.split(".");
  const n = Number.parseInt(whole || "0", 10);
  const formatted = new Intl.NumberFormat("en-US").format(Number.isFinite(n) ? n : 0);
  if (cleaned.includes(".")) {
    return `${formatted}.${(fraction ?? "").slice(0, 2)}`;
  }
  return formatted;
}
