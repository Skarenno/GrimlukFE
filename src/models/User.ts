import type { CardStatusType } from "../feature/utils/enums";

export interface Account {
  id: number;
  user_id: number;
  username: string;

  account_number: string;
  account_type: string;

  currency: string;
  balance: number;              // converted to number
  available_balance: number;    // converted to number
  credit_limit: number;         // converted to number
  interest_rate: number;        // converted to number

  is_joint: boolean;
  branch_code: string;
  product_code: string;

  status: string;

  opened_at: string;       // ISO date string
  last_activity?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface Card {
  id: number;
  user_id: number;
  account_id: number;

  cardholder_name: string;
  card_type: "debit" | "credit" | "prepaid";
  network?: string;           // Visa, MasterCard, etc.
  issuer?: string;            // Bank or institution name

  card_number:string;
  last4: string;              // Last 4 digits
  masked_number?: string;     // **** **** **** 1234
  expiry_month: number;
  expiry_year: number;

  status: CardStatusType;
  is_virtual: boolean;
  contactless_enabled: boolean;
  daily_limit: number;
  online_payments_enabled: boolean;

  created_at?: string;
  updated_at?: string;
  last_used_at?: string;
}


export interface Transaction {
  date: string;
  description: string;
  amount: number;
}

export interface UserInfo {
  id: number;
  username: string;
  tax_code: string;
  name: string;
  surname: string;
  phone: string;
  gender?: string | null;
  residence_address_1?: string | null;
  residence_address_2?: string | null;
  city?: string | null;
  birth_date: string;
  province?: string | null;
  postal_code?: string | null;
  country?: string | null;
}


export interface User {
  userInfo: UserInfo;
  accounts: Account[];
  cards: Card[];
  transactions: Transaction[];
}



export const mockUserEmpty: User = {
  userInfo: {
    id: 1,
    name: "Mario",
    surname: "Rossi",
    username: "mario.rossi@a.it",
    tax_code: "MRRSS023327894N",
    phone: "+39373737",
    birth_date: "1989-01-01"
  },
  accounts: [],
  cards: [],
  transactions: [],
}


export const mockUserFilled: User = {
  userInfo: {
    id: 1,
    name: "Mario",
    surname: "Rossi",
    username: "mario.rossi@a.it",
    tax_code: "MRRSS023327894N",
    phone: "+39373737",
    birth_date: "1989-01-01",
  },

  accounts: [
    {
      id: 101,
      user_id: 1,
      username: "zqaz1234@gmail.com",
      account_number: "ACCT-PRIMARY-001",
      account_type: "checking",
      currency: "EUR",
      balance: 3245.67,
      available_balance: 3245.67,
      credit_limit: 500.0,
      interest_rate: 1.25,
      is_joint: false,
      branch_code: "BR001",
      product_code: "CHK01",
      status: "active",
      opened_at: "2024-01-03T10:12:00.000Z",
      last_activity: "2025-10-13T15:24:00.000Z",
      created_at: "2024-01-03T10:12:00.000Z",
      updated_at: "2025-10-13T15:24:00.000Z",
    },
    {
      id: 102,
      user_id: 1,
      username: "zqaz1234@gmail.com",
      account_number: "ACCT-SAVING-002",
      account_type: "savings",
      currency: "EUR",
      balance: 15890.45,
      available_balance: 15890.45,
      credit_limit: 0.0,
      interest_rate: 2.1,
      is_joint: false,
      branch_code: "BR001",
      product_code: "SVG01",
      status: "active",
      opened_at: "2023-05-20T08:05:00.000Z",
      last_activity: "2025-10-12T11:10:00.000Z",
      created_at: "2023-05-20T08:05:00.000Z",
      updated_at: "2025-10-12T11:10:00.000Z",
    },
  ],

  cards: [
    {
      id: 1,
      user_id: 1,
      account_id: 102,
      cardholder_name: "Mario Rossi",
      card_type: "debit",
      network: "Visa",
      issuer: "Grimluk Bank",
      last4: "1234",
      card_number : "1234 1234 1234 1234",
      masked_number: "**** **** **** 1234",
      expiry_month: 12,
      expiry_year: 2025,
      status: "active",
      is_virtual: false,
      contactless_enabled: true,
      daily_limit: 2500.0,
      online_payments_enabled: true,
      created_at: "2024-02-10T09:30:00.000Z",
      updated_at: "2025-10-10T12:00:00.000Z",
      last_used_at: "2025-10-09T14:20:00.000Z",
    },
    {
      id: 2,
      user_id: 1,
      account_id: 101,
      cardholder_name: "Mario Rossi",
      card_type: "credit",
      network: "MasterCard",
      issuer: "Grimluk Bank",
      last4: "5678",
      card_number : "5678 5678 5678 5678",
      masked_number: "**** **** **** 5678",
      expiry_month: 6,
      expiry_year: 2026,
      status: "active",
      is_virtual: false,
      contactless_enabled: true,
      daily_limit: 5000.0,
      online_payments_enabled: true,
      created_at: "2024-06-15T11:10:00.000Z",
      updated_at: "2025-09-22T08:45:00.000Z",
      last_used_at: "2025-10-10T19:00:00.000Z",
    },
  ],

  transactions: [
    {
      date: "2025-10-12",
      description: "Pagamento bolletta energia",
      amount: -75.5,
    },
    {
      date: "2025-10-10",
      description: "Ricarica cellulare",
      amount: -15.0,
    },
    {
      date: "2025-10-08",
      description: "Stipendio",
      amount: 2500.0,
    },
    {
      date: "2025-10-07",
      description: "Acquisto Amazon",
      amount: -120.99,
    },
    {
      date: "2025-10-06",
      description: "Bonifico ricevuto da Luca",
      amount: 500.0,
    },
  ],
};

