import axios from "axios";

export const user_service_api = axios.create({
  baseURL: "http://localhost:8001", // Your FastAPI base URL
});

user_service_api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
  


export const registerUser = async (data: { email: string; password: string }) => {
    return user_service_api.post("/user/register", data);
  };
  
export const loginUser = async (data: { username: string; password: string }) => {
  return user_service_api.post("/user/login", data);
};


export const getUserInfo = async (data: {username:string }) => {
  return user_service_api.get("/user/getUserInfo/" + data.username)
}