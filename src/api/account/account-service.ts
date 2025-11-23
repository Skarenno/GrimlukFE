import type { AccountCreateRequest, AccountDeleteRequest } from "./requests";
import type { Account,  Transaction } from "../../models/User";
import type { AccountType, BranchCode } from "./responses";
import { api } from "../apiClient";

const serviceName = "account"

export const createAccount = async (data: AccountCreateRequest) => api.post(`/${serviceName}/create`, data);

export const getAccounts = async (userId: number): Promise<Account[]> => {
  console.log("Account service base URL:", import.meta.env.VITE_API_ACCOUNT_URL);
  const res = await api.get(`/${serviceName}/getAccounts/${userId}`);
  return res.data;
};

export const getTransactions = async (userId: number): Promise<Transaction[]> => {
  const res = await api.get(`/${serviceName}/getTransactions/${userId}`);
  return res.data;
};

export const getAccountTypes = async (): Promise<AccountType[]> => {
  const res = await api.get(`/${serviceName}/getAccountTypes`);
  return res.data;
};

export const getBranchCodes = async (): Promise<BranchCode[]> => {
  const res = await api.get(`/${serviceName}/getBranchCodes`);
  return res.data;
};


export const deleteAccount = async(data: AccountDeleteRequest) : Promise<Account> => {
  const res = await api.post(`/${serviceName}/delete`, data)
  return res.data
}