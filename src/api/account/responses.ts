import type { CardStatusType } from "../../feature/utils/enums";

export interface AccountType{
    code:string;
    name:string;
}

export interface BranchCode{
    code:string;
    name:string;
}

export interface CardResponse {
  id: number;
  user_id: number;
  account_id: number;

  cardholder_name: string;
  card_type: "debit" | "credit" | "prepaid";
  network?: "Visa" | "MasterCard" | "Amex" | string;
  issuer?: string | null;

  last4: string;                // 4 digits
  masked_number?: string | null;
  expiry_month: number;         // 1–12
  expiry_year: number;          // 2023–2100

  status: CardStatusType;

  is_virtual: boolean;
  contactless_enabled: boolean;
  daily_limit: number;
  online_payments_enabled: boolean;

  created_at?: string | null;
  updated_at?: string | null;
  last_used_at?: string | null;
}
