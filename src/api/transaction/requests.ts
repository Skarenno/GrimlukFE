
export interface TransactionGetByAccount{
  user_id:number
  account_numbers: string[]
}


export interface TransactionCreateRequest {
  user_id: number;
  s_account_id: number;
  s_account_number: string;
  r_account_id?: number | null;
  r_account_number: string;
  amount: string;      
  description?: string | null;
  is_internal: boolean;
  is_same_user:boolean;
  is_blocking_account: boolean;
}