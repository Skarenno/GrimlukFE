export interface AccountBase {
  account_type: string;          
  currency?: string;             
  credit_limit?: number;         
  interest_rate?: number;        
  is_joint?: boolean;            
  branch_code?: string | null;   
  product_code?: string | null;  
}

export interface AccountCreateRequest extends AccountBase {
  user_id: number;
  username: string;
  initial_deposit?: number;      
}

export interface AccountDeleteRequest{
  deleteId: number;
  transferId?: number;
}

export interface CardCreateRequest {
  user_id: number;
  account_id: number;
  cardholder_name: string;
  card_type: "debit" | "credit" | "prepaid";
  network: string;
  daily_limit: number;
  online_payments_enabled: boolean;
}

export interface CardUpdateRequest {
  daily_limit?: number;
  online_payments_enabled?: boolean;
  status: "active" | "blocked" | "expired" | "lost";
}
