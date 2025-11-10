import axios from "axios";
import { type  AccountCreateRequest } from "./requests";
import { type Account, type Card, type Transaction } from "../../models/User";
import type { AccountType } from "./responses";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8002";

const api = axios.create({
  baseURL: `${API_BASE_URL}/account`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
  


export const createAccount = async (data: AccountCreateRequest) => {
    return api.post("/create", data);
  };


export const getAccounts = async (userId: number): Promise<Account[]> =>{
    const response = await api.get(`/getAccounts/${userId}`);
    response.data.forEach((account: { account_number: any; balance: any; }) => console.log(account.account_number, account.balance));
    return response.data;
}

export const getTransactions = async (userId: number): Promise<Transaction[]> => {
  const response = await api.get(`/getTransactions/${userId}`);
  return response.data;
};

export const getCards = async (userId: number): Promise<Card[]> => {
  const response = await api.get(`/getCards/${userId}`);
  return response.data;
};

export const getAccountTypes = async (): Promise<AccountType[]> => {
  const response = await api.get(`/getAccountTypes`)
  return response.data;
}