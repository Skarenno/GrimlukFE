import axios from "axios";

export const user_service_api = axios.create({
  baseURL: "http://localhost:8001", // Your FastAPI base URL
});


export const registerUser = async (data: { username: string; email: string; password: string }) => {
    return user_service_api.post("/user/register", data);
  };
  
  export const loginUser = async (data: { username: string; password: string }) => {
    return user_service_api.post("/user/login", data);
  };