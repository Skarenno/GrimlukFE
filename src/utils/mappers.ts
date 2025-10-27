import type { UserInfoRequest } from "../api/user/requests";
import type { UserInfo } from "../models/User";


export function mapUserInfoToRequest(userInfo: UserInfo): UserInfoRequest {
  return {
    id:userInfo.id,
    username: userInfo.username,
    tax_code: userInfo.tax_code,
    name: userInfo.name,
    surname: userInfo.surname,
    birth_date: userInfo.birth_date,
    phone: userInfo.phone,
    gender: (userInfo.gender as "M" | "F" | "O") || "O", // default if null
    residence_address_1: userInfo.residence_address_1 ?? "",
    residence_address_2: userInfo.residence_address_2 ?? "",
    city: userInfo.city ?? "",
    province: userInfo.province ?? "",
    postal_code: userInfo.postal_code ?? "",
    country: userInfo.country ?? "",
  };
}
