export interface UserInfo {
  id: string;
  username: string;
  tax_code: string;
  name: string;
  surname: string;
  phone: string;
  gender?: string | null;
  residence_address_1?: string | null;
  residence_address_2?: string | null;
  city?: string | null;
  province?: string | null;
  postal_code?: string | null;
  country?: string | null;
}
