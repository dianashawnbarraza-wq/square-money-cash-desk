import type {
  Account,
  Approval,
  Bill,
  CardAccount,
  Transaction,
  UpcomingItem,
} from "./types";

export const BUSINESS = {
  product: "Square Money",
  desk: "Cash Desk",
  name: "Dave's Plumbing & Rooter",
  shortName: "Dave's Plumbing",
  freshness: "Updated after morning POS batch",
  asOf: "Wed, Sep 2",
};

export const PAYROLL_AMOUNT = 20_800;
export const TAX_SWEEP_DEFAULT = 2_000;
export const MAYA_CAP_DEFAULT = 1_000;
export const MAYA_USED = 640;
export const OAK_STREET = 4_200;
export const WILLOW_LANE = 3_800;
export const SETTLING = 8_200;
export const COMMITTED = 29_708;
export const INCOMING = 8_000;
export const CHECKING_AFTER_BILLS = 42_400;
export const TAX_APY = 3.5;
export const UNDO_MS = 30_000;

export const SEED_BALANCES = {
  checking: 40_400,
  taxSavings: 18_640,
  savings: 24_100,
};

export const ACCOUNTS: Account[] = [
  {
    id: "checking",
    name: "Checking",
    kind: "Spendable",
    balance: SEED_BALANCES.checking,
    detail: "Square Checking · ···4418",
  },
  {
    id: "settling",
    name: "Settling",
    kind: "POS batches",
    balance: SETTLING,
    detail: "Field jobs · lands in 1-2 days",
  },
  {
    id: "tax",
    name: "Tax Savings",
    kind: "Folder",
    balance: SEED_BALANCES.taxSavings,
    detail: `${TAX_APY}% APY · 8% of deposits when the rule is on`,
  },
  {
    id: "savings",
    name: "Operating Savings",
    kind: "Reserve",
    balance: SEED_BALANCES.savings,
    detail: "Square Savings · ···9021",
  },
];

export const UPCOMING: UpcomingItem[] = [
  {
    id: "ferguson",
    when: "Thu, Sep 3",
    name: "Ferguson Supply",
    amount: -2_600,
    kind: "bill",
  },
  {
    id: "payroll",
    when: "Fri, Sep 4",
    name: "Payroll",
    amount: -PAYROLL_AMOUNT,
    kind: "payroll",
  },
  {
    id: "fleet",
    when: "Mon, Sep 7",
    name: "Progressive fleet",
    amount: -1_868,
    kind: "bill",
  },
];

export const BILLS: Bill[] = [
  {
    id: "ferguson",
    vendor: "Ferguson Supply",
    amount: 2_600,
    due: "Thu, Sep 3",
    status: "scheduled",
    method: "ACH",
  },
  {
    id: "payroll",
    vendor: "Payroll · 25 people",
    amount: PAYROLL_AMOUNT,
    due: "Fri, Sep 4",
    status: "scheduled",
    method: "Direct deposit",
  },
  {
    id: "workers-comp",
    vendor: "State Fund workers comp",
    amount: 3_240,
    due: "Fri, Sep 4",
    status: "scheduled",
    method: "ACH",
  },
  {
    id: "pge",
    vendor: "PG&E shop",
    amount: 480,
    due: "Mon, Sep 7",
    status: "due",
    method: "Bill pay",
  },
  {
    id: "fleet",
    vendor: "Progressive fleet",
    amount: 1_868,
    due: "Mon, Sep 7",
    status: "scheduled",
    method: "ACH",
  },
  {
    id: "dump",
    vendor: "City dump fees",
    amount: 1_200,
    due: "Tue, Sep 8",
    status: "due",
    method: "Check",
  },
  {
    id: "verizon",
    vendor: "Verizon yard line",
    amount: 214,
    due: "Paid Aug 28",
    status: "paid",
    method: "Card",
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: "pos-1",
    date: "Today, 7:14 a.m.",
    name: "POS batch · 6 field jobs",
    method: "Square POS · settling",
    amount: 3_140,
    pending: true,
  },
  {
    id: "hd-1",
    date: "Yesterday",
    name: "Home Depot",
    method: "Maya Chen · ····7741",
    amount: -186.4,
    confirmSupplies: true,
  },
  {
    id: "zelle-1",
    date: "Yesterday",
    name: "Zelle · Mike Ruiz (helper)",
    method: "Checking",
    amount: -180,
    category: "Labor",
  },
  {
    id: "ferguson-card",
    date: "Aug 28",
    name: "Ferguson Supply",
    method: "Maya Chen · ····7741",
    amount: -2_600,
    category: "Materials",
  },
  {
    id: "pos-2",
    date: "Aug 28",
    name: "POS batch · 4 field jobs",
    method: "Square POS · settled",
    amount: 2_180,
    category: "Sales",
  },
  {
    id: "invoice-1",
    date: "Aug 26",
    name: "Harbor Dental · invoice paid",
    method: "ACH in",
    amount: 6_400,
    category: "Invoices",
  },
  {
    id: "tax-last",
    date: "Aug 25",
    name: "Tax Savings folder",
    method: "8% of deposit",
    amount: -512,
    category: "Tax reserve",
  },
];

export const CARDS: CardAccount[] = [
  {
    id: "maya",
    holder: "Maya Chen",
    last4: "7741",
    network: "Square debit",
    kind: "GM spend",
    spentThisMonth: MAYA_USED,
  },
  {
    id: "dave",
    holder: "Dave Alvarez",
    last4: "1190",
    network: "Square debit",
    kind: "Owner",
    spentThisMonth: 214,
  },
  {
    id: "outside",
    holder: "Home Depot consumer card",
    last4: "4428",
    network: "Outside Visa",
    kind: "Not issued by Square",
    spentThisMonth: 0,
  },
];

export const SEED_APPROVALS: Approval[] = [
  {
    id: "payroll",
    createdOrder: 1,
    tag: "Payroll Watch",
    tone: "watch",
    title: "Cover payroll Friday",
    amountLabel: "$20,800",
    why: "Settling POS covers the gap if Oak Street pays. Otherwise move $4,200 from Savings.",
    evidence: [
      { label: "Oak Street invoice", value: "$4,200", hint: "outstanding · net-30, sent Aug 5" },
      { label: "Willow Lane", value: "$3,800", hint: "outstanding · net-30, sent Aug 12" },
      { label: "Payroll Fri", value: "−$20,800", hint: "needs Checking" },
    ],
    primary: "Review package",
    secondary: "Watch through Friday",
    primarySheet: "payroll",
  },
  {
    id: "tax-sweep",
    createdOrder: 2,
    tag: "Tax Reserve",
    tone: "grow",
    title: "Sweep leftover to Tax Savings",
    amountLabel: "$2,000",
    why: "Leftover after this week bills. 3.5% APY. Nothing moves until you confirm.",
    evidence: [
      { label: "Checking after bills", value: "$42,400" },
      { label: "Payroll still covered", value: "$20,800" },
      { label: "Tax folder rule", value: "paused", hint: "last ran Aug 25" },
    ],
    primary: "Move $2,000",
    secondary: "Edit amount",
    primarySheet: "move-tax",
  },
  {
    id: "maya-cap",
    createdOrder: 3,
    tag: "Card Guard",
    tone: "learn",
    title: "Cap Maya's debit",
    amountLabel: "$1,000/mo",
    why: "Maya is $640 this week under the proposed cap. Over-cap routes here.",
    evidence: [
      { label: "Maya Chen", value: "····7741", hint: "Square debit · GM" },
      { label: "Home Depot", value: "$186.40", hint: "yesterday" },
      { label: "Ferguson", value: "$2,600", hint: "Aug 28" },
    ],
    primary: "Set $1,000 cap",
    secondary: "Review spend",
    primarySheet: "maya-cap",
  },
];

export const CHASE_OAK_APPROVAL: Approval = {
  id: "chase-oak",
  createdOrder: 4,
  tag: "Invoice Chase",
  tone: "learn",
  title: "Nudge Oak Street",
  amountLabel: "$4,200",
  why: "Net-30 sent Aug 5. If it lands before Friday, payroll can stay in Checking.",
  evidence: [
    { label: "Oak Street", value: "$4,200", hint: "outstanding" },
    { label: "Payroll Fri", value: "−$20,800", hint: "Sep 4" },
    { label: "Nothing moves", value: "nudge only" },
  ],
  primary: "Send nudge",
  secondary: "Not now",
};

export const NAV = [
  { href: "/", label: "Overview" },
  { href: "/approvals", label: "Approvals", badge: true },
  { href: "/accounts", label: "Accounts" },
  { href: "/transactions", label: "Transactions" },
  { href: "/bill-pay", label: "Bill pay" },
  { href: "/wallet", label: "Wallet" },
  { href: "/plan", label: "Plan" },
  { href: "/rules", label: "Rules" },
] as const;
