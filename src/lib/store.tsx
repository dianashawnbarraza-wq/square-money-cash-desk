"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  CHASE_OAK_APPROVAL,
  MAYA_CAP_DEFAULT,
  MAYA_USED,
  OAK_STREET,
  SEED_APPROVALS,
  SEED_BALANCES,
  TAX_SWEEP_DEFAULT,
  UNDO_MS,
} from "./data";
import { money } from "./format";
import type {
  Approval,
  ApprovalId,
  ApprovalRuntime,
  PayrollChoice,
  SheetKind,
  SheetState,
  Toast,
  UndoWindow,
} from "./types";

interface MoneyState {
  checking: number;
  taxSavings: number;
  savings: number;
  mayaCap: number | null;
  taxFolderPaused: boolean;
  taxFolderPercent: number;
  homeDepotConfirmed: boolean;
  approvals: Record<string, ApprovalRuntime>;
  extraApprovalIds: string[];
  toast: Toast | null;
  undo: UndoWindow | null;
  sheet: SheetState | null;
  snapshot: Snapshot | null;
}

interface Snapshot {
  checking: number;
  taxSavings: number;
  savings: number;
  approvals: Record<string, ApprovalRuntime>;
}

type Action =
  | { type: "open-sheet"; kind: SheetKind }
  | { type: "close-sheet" }
  | { type: "dismiss-toast" }
  | { type: "clear-undo" }
  | { type: "watch"; id: ApprovalId; title: string; body: string; toast: string }
  | { type: "confirm-tax"; amount: number }
  | { type: "confirm-maya"; amount: number }
  | { type: "remove-maya" }
  | { type: "confirm-payroll"; choice: PayrollChoice }
  | { type: "confirm-chase-oak" }
  | { type: "add-chase-oak" }
  | { type: "set-tax-folder"; paused?: boolean; percent?: number }
  | { type: "confirm-supplies" }
  | { type: "undo" };

const seedRuntimes = (): Record<string, ApprovalRuntime> => {
  const runtimes: Record<string, ApprovalRuntime> = {};
  for (const item of SEED_APPROVALS) {
    runtimes[item.id] = { status: "open" };
  }
  return runtimes;
};

const initialState: MoneyState = {
  checking: SEED_BALANCES.checking,
  taxSavings: SEED_BALANCES.taxSavings,
  savings: SEED_BALANCES.savings,
  mayaCap: null,
  taxFolderPaused: true,
  taxFolderPercent: 8,
  homeDepotConfirmed: false,
  approvals: seedRuntimes(),
  extraApprovalIds: [],
  toast: null,
  undo: null,
  sheet: null,
  snapshot: null,
};

function toast(message: string, undoId?: string): Toast {
  return { id: `${Date.now()}-${Math.random()}`, message, undoId };
}

function withUndo(label: string, undoId: string): UndoWindow {
  return { id: undoId, label, expiresAt: Date.now() + UNDO_MS };
}

function snapshotOf(state: MoneyState): Snapshot {
  return {
    checking: state.checking,
    taxSavings: state.taxSavings,
    savings: state.savings,
    approvals: structuredClone(state.approvals),
  };
}

function reducer(state: MoneyState, action: Action): MoneyState {
  switch (action.type) {
    case "open-sheet":
      return { ...state, sheet: { kind: action.kind } };
    case "close-sheet":
      return { ...state, sheet: null };
    case "dismiss-toast":
      return { ...state, toast: null };
    case "clear-undo":
      return { ...state, undo: null, snapshot: null };
    case "watch": {
      return {
        ...state,
        sheet: null,
        approvals: {
          ...state.approvals,
          [action.id]: {
            status: "watching",
            outcomeTitle: action.title,
            outcomeBody: action.body,
          },
        },
        toast: toast(action.toast),
      };
    }
    case "confirm-tax": {
      if (action.amount <= 0 || action.amount > state.checking) return state;
      const after = state.checking - action.amount;
      return {
        ...state,
        snapshot: snapshotOf(state),
        checking: after,
        taxSavings: state.taxSavings + action.amount,
        sheet: null,
        approvals: {
          ...state.approvals,
          "tax-sweep": {
            status: "confirmed",
            confirmedAmount: action.amount,
            outcomeTitle: "That held",
            outcomeBody: `Checking is ${money(after)}. Payroll Friday still covered. ${money(action.amount)} is in Tax Savings at 3.5% APY.`,
          },
        },
        toast: toast(`Moved ${money(action.amount)} to Tax Savings.`, "tax-sweep"),
        undo: withUndo("Undo move", "tax-sweep"),
      };
    }
    case "confirm-maya": {
      const remaining = Math.max(0, action.amount - MAYA_USED);
      return {
        ...state,
        sheet: null,
        mayaCap: action.amount,
        approvals: {
          ...state.approvals,
          "maya-cap": {
            status: "confirmed",
            confirmedAmount: action.amount,
            outcomeTitle: "Cap is on",
            outcomeBody: `Maya can spend ${money(remaining)} more this month before a charge pauses and comes here.`,
          },
        },
        toast: toast(`Maya's debit is capped at ${money(action.amount)}/mo.`),
      };
    }
    case "remove-maya": {
      return {
        ...state,
        mayaCap: null,
        sheet: null,
        approvals: {
          ...state.approvals,
          "maya-cap": { status: "open" },
        },
        toast: toast("Maya's cap is off. Over-limit charges will not pause."),
      };
    }
    case "confirm-payroll": {
      if (action.choice === "chase") {
        return {
          ...state,
          sheet: null,
          approvals: {
            ...state.approvals,
            payroll: {
              status: "watching",
              outcomeTitle: "Nudges are out",
              outcomeBody:
                "Oak Street and Willow Lane will hear from you. Nothing left Checking. We'll tell you if either pays before Friday.",
            },
          },
          toast: toast("Nudge queued for Oak Street and Willow Lane. Nothing moved."),
        };
      }
      const amount = OAK_STREET;
      if (amount > state.savings) return state;
      return {
        ...state,
        snapshot: snapshotOf(state),
        savings: state.savings - amount,
        checking: state.checking + amount,
        sheet: null,
        approvals: {
          ...state.approvals,
          payroll: {
            status: "confirmed",
            confirmedAmount: amount,
            outcomeTitle: "That held",
            outcomeBody: `${money(amount)} is in Checking. Payroll Friday is covered even if invoices miss.`,
          },
        },
        toast: toast(`Moved ${money(amount)} from Savings to Checking.`, "payroll"),
        undo: withUndo("Undo transfer", "payroll"),
      };
    }
    case "add-chase-oak": {
      if (state.extraApprovalIds.includes("chase-oak") || state.approvals["chase-oak"]) {
        return { ...state, sheet: null };
      }
      return {
        ...state,
        extraApprovalIds: [...state.extraApprovalIds, "chase-oak"],
        approvals: {
          ...state.approvals,
          "chase-oak": { status: "open" },
        },
        toast: toast("Added to Approvals: nudge Oak Street for $4,200."),
      };
    }
    case "confirm-chase-oak": {
      return {
        ...state,
        sheet: null,
        approvals: {
          ...state.approvals,
          "chase-oak": {
            status: "confirmed",
            outcomeTitle: "Nudge sent",
            outcomeBody: "Oak Street will see a reminder on the $4,200 invoice. Nothing moved.",
          },
        },
        toast: toast("Nudge sent to Oak Street. Nothing moved."),
      };
    }
    case "set-tax-folder": {
      return {
        ...state,
        sheet: null,
        taxFolderPaused: action.paused ?? state.taxFolderPaused,
        taxFolderPercent: action.percent ?? state.taxFolderPercent,
        toast: toast(
          action.percent != null
            ? `Tax folder will move ${action.percent}% of every deposit.`
            : action.paused
              ? "Tax folder paused. Nothing moves on the next deposit."
              : `Tax folder resumed. Next deposit will move ${action.percent ?? state.taxFolderPercent}% unless you edit it.`,
        ),
      };
    }
    case "confirm-supplies": {
      return {
        ...state,
        homeDepotConfirmed: true,
        toast: toast("Home Depot $186.40 filed as Supplies."),
      };
    }
    case "undo": {
      if (!state.snapshot) return { ...state, undo: null };
      return {
        ...state,
        checking: state.snapshot.checking,
        taxSavings: state.snapshot.taxSavings,
        savings: state.snapshot.savings,
        approvals: state.snapshot.approvals,
        toast: toast("Undone. Balances are back to before that move."),
        undo: null,
        snapshot: null,
      };
    }
    default:
      return state;
  }
}

interface MoneyContextValue {
  state: MoneyState;
  catalog: Approval[];
  openCount: number;
  openSheet: (kind: SheetKind) => void;
  closeSheet: () => void;
  dismissToast: () => void;
  watch: (id: ApprovalId, title: string, body: string, toastMessage: string) => void;
  confirmTax: (amount: number) => void;
  confirmMaya: (amount: number) => void;
  removeMaya: () => void;
  confirmPayroll: (choice: PayrollChoice) => void;
  addChaseOak: () => void;
  confirmChaseOak: () => void;
  setTaxFolder: (patch: { paused?: boolean; percent?: number }) => void;
  confirmSupplies: () => void;
  undo: () => void;
}

const MoneyContext = createContext<MoneyContextValue | null>(null);

export function MoneyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.undo) return;
    const remaining = state.undo.expiresAt - Date.now();
    if (remaining <= 0) {
      dispatch({ type: "clear-undo" });
      return;
    }
    const t = window.setTimeout(() => dispatch({ type: "clear-undo" }), remaining);
    return () => window.clearTimeout(t);
  }, [state.undo]);

  useEffect(() => {
    if (!state.toast) return;
    const t = window.setTimeout(() => dispatch({ type: "dismiss-toast" }), 5200);
    return () => window.clearTimeout(t);
  }, [state.toast]);

  const catalog = useMemo(() => {
    const extras = state.extraApprovalIds
      .map((id) => (id === "chase-oak" ? CHASE_OAK_APPROVAL : null))
      .filter((item): item is Approval => item !== null);
    return [...SEED_APPROVALS, ...extras].sort((a, b) => a.createdOrder - b.createdOrder);
  }, [state.extraApprovalIds]);

  const openCount = catalog.filter((item) => {
    const runtime = state.approvals[item.id];
    return !runtime || runtime.status === "open";
  }).length;

  const value = useMemo<MoneyContextValue>(
    () => ({
      state,
      catalog,
      openCount,
      openSheet: (kind) => dispatch({ type: "open-sheet", kind }),
      closeSheet: () => dispatch({ type: "close-sheet" }),
      dismissToast: () => dispatch({ type: "dismiss-toast" }),
      watch: (id, title, body, toastMessage) =>
        dispatch({ type: "watch", id, title, body, toast: toastMessage }),
      confirmTax: (amount) => dispatch({ type: "confirm-tax", amount }),
      confirmMaya: (amount) => dispatch({ type: "confirm-maya", amount }),
      removeMaya: () => dispatch({ type: "remove-maya" }),
      confirmPayroll: (choice) => dispatch({ type: "confirm-payroll", choice }),
      addChaseOak: () => dispatch({ type: "add-chase-oak" }),
      confirmChaseOak: () => dispatch({ type: "confirm-chase-oak" }),
      setTaxFolder: (patch) => dispatch({ type: "set-tax-folder", ...patch }),
      confirmSupplies: () => dispatch({ type: "confirm-supplies" }),
      undo: () => dispatch({ type: "undo" }),
    }),
    [state, catalog, openCount],
  );

  return <MoneyContext.Provider value={value}>{children}</MoneyContext.Provider>;
}

export function useMoney() {
  const ctx = useContext(MoneyContext);
  if (!ctx) throw new Error("useMoney must be used inside MoneyProvider");
  return ctx;
}

export { TAX_SWEEP_DEFAULT, MAYA_CAP_DEFAULT };
