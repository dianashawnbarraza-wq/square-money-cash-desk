export type TagTone = "watch" | "grow" | "learn" | "act";

export type ApprovalStatus = "open" | "watching" | "confirmed" | "dismissed";

export type ApprovalId =
  | "payroll"
  | "tax-sweep"
  | "maya-cap"
  | "chase-oak"
  | string;

export type SheetKind =
  | "move-tax"
  | "maya-cap"
  | "payroll"
  | "tax-folder"
  | "maya-edit"
  | "transfer"
  | "deposit";

export type PayrollChoice = "chase" | "move-savings";

export interface EvidenceRow {
  label: string;
  value: string;
  hint?: string;
}

export interface Approval {
  id: ApprovalId;
  createdOrder: number;
  tag: string;
  tone: TagTone;
  title: string;
  amountLabel?: string;
  why: string;
  evidence: EvidenceRow[];
  primary: string;
  secondary: string;
  primarySheet?: SheetKind;
}

export interface UpcomingItem {
  id: string;
  when: string;
  name: string;
  amount: number;
  kind: "payroll" | "bill" | "card";
}

export interface Bill {
  id: string;
  vendor: string;
  amount: number;
  due: string;
  status: "scheduled" | "due" | "paid";
  method: string;
}

export interface Transaction {
  id: string;
  date: string;
  name: string;
  method: string;
  amount: number;
  category?: string;
  pending?: boolean;
  confirmSupplies?: boolean;
}

export interface Account {
  id: string;
  name: string;
  kind: string;
  balance: number;
  detail: string;
}

export interface CardAccount {
  id: string;
  holder: string;
  last4: string;
  network: string;
  kind: string;
  spentThisMonth: number;
  limit?: number;
}

export interface Toast {
  id: string;
  message: string;
  undoId?: string;
}

export interface UndoWindow {
  id: string;
  expiresAt: number;
  label: string;
}

export interface ApprovalRuntime {
  status: ApprovalStatus;
  outcomeTitle?: string;
  outcomeBody?: string;
  confirmedAmount?: number;
}

export interface SheetState {
  kind: SheetKind;
}

export interface PersistedMoney {
  checking: number;
  taxSavings: number;
  savings: number;
  mayaCap: number | null;
  taxFolderPaused: boolean;
  taxFolderPercent: number;
  homeDepotConfirmed: boolean;
  approvals: Record<string, ApprovalRuntime>;
  extraApprovalIds: string[];
}
