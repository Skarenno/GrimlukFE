import { createApiClient } from "../apiClient";
import type { AccountCreateRequest } from "./requests";
import type { Account, Card, Transaction } from "../../models/User";
import type { AccountType } from "./responses";

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

export const getCards = async (userId: number): Promise<Card[]> => {
  const res = await api.get(`/getCards/${userId}`);
  return res.data;
};

export const getAccountTypes = async (): Promise<AccountType[]> => {
  const res = await api.get(`/getAccountTypes`);
  return res.data;
};