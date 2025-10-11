import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data: { email: string; password: string }) => {
    return api.post("/register", data);
  };
  
  export const loginUser = async (data: { username: string; password: string }) => {
    return api.post("/login", data);
  };