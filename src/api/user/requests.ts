export interface UserInfoRequest {
  id?:string;
  username: string;
  tax_code: string;
  name: string;
  surname: string;
  birth_date:string;
  phone: string;
  gender?: "M" | "F" | "O"; 
  residence_address_1?: string;
  residence_address_2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
}


interface UserCredentials {
    username: string;
    password: string;
}

export interface UserRegisterReuqest{
    userInfo: UserInfoRequest
    userCredentials: UserCredentials
}