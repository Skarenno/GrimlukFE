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
