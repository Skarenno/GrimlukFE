// import type { AccountDeleteRequest } from "./requests";
import type { Transaction } from "../../models/User";

import { api } from "../apiClient";
import type { TransactionCreateRequest, TransactionGetByAccount } from "./requests";


const serviceName = "transaction"

export const getTransactionsByUserId = async (userId: number): Promise<Transaction[]> => {
  const res = await api.get(`/${serviceName}/getByUserId/${userId}`);
  return res.data;
};

export const getTransactionsByAccounts = async (req: TransactionGetByAccount): Promise<Transaction[]> => {
    const res = await api.post(`/${serviceName}/getByAccountList`, req);
    return res.data
};

export const createTransaction = async (req: TransactionCreateRequest): Promise<string> => {
  const res = await api.post(`/${serviceName}/create`, req);
  return res.data
}