import { type  UserRegisterReuqest } from "./requests";
import { api } from "../apiClient";
  
const serviceName = "user"

export const registerUser = async (data: UserRegisterReuqest) => {
    return api.post(`/${serviceName}/register`, data);
  };
  
export const loginUser = async (data: { username: string; password: string }) => {
  return api.post(`/${serviceName}/login`, data);
};

