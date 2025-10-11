import axios from "axios";
import { type  UserRegisterReuqest } from "./requests";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
  


export const registerUser = async (data: UserRegisterReuqest) => {
    return api.post("/register", data);
  };
  
export const loginUser = async (data: { username: string; password: string }) => {
  return api.post("/login", data);
};

