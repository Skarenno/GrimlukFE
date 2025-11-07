import axios from "axios";
import { type  AccountCreateRequest } from "./requests";
import { type Account, type Card, type Transaction } from "../../models/User";
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
  


export const create = async (data: AccountCreateRequest) => {
    return api.post("/create", data);
  };


export const getAccounts = async (userId: String): Promise<Account[]> =>{
    const response = await api.get(`/getAccounts/${userId}`);
    response.data.forEach((account: { account_number: any; balance: any; }) => console.log(account.account_number, account.balance));
    return response.data;
}

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  const response = await api.get(`/getTransactions/${userId}`);
  return response.data;
};

export const getCards = async (userId: string): Promise<Card[]> => {
  const response = await api.get(`/getCards/${userId}`);
  return response.data;
};
