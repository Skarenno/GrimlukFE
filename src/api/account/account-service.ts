import { createApiClient } from "../apiClient";
import type { AccountCreateRequest, AccountDeleteRequest } from "./requests";
import type { Account,  Transaction } from "../../models/User";
import type { AccountType, BranchCode } from "./responses";

const api = createApiClient(import.meta.env.VITE_API_ACCOUNT_URL);

export const createAccount = async (data: AccountCreateRequest) => api.post("/create", data);

export const getAccounts = async (userId: number): Promise<Account[]> => {
  console.log("Account service base URL:", import.meta.env.VITE_API_ACCOUNT_URL);
  const res = await api.get(`/getAccounts/${userId}`);
  return res.data;
};

export const getTransactions = async (userId: number): Promise<Transaction[]> => {
  const res = await api.get(`/getTransactions/${userId}`);
  return res.data;
};

export const getAccountTypes = async (): Promise<AccountType[]> => {
  const res = await api.get(`/getAccountTypes`);
  return res.data;
};

export const getBranchCodes = async (): Promise<BranchCode[]> => {
  const res = await api.get(`/getBranchCodes`);
  return res.data;
};


export const deleteAccount = async(data: AccountDeleteRequest) : Promise<Account> => {
  const res = await api.post(`/delete`, data)
  return res.data
}