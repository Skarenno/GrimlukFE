import axios, { AxiosError } from "axios";
// import { type UserInfoRequest } from "./requests";



const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

const api = axios.create({
  baseURL: `${API_BASE_URL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

// export async function submitUserInfo(userInfo: UserInfoRequest): Promise<any> {
//   try {
//     const response = await api.post("/updateUserInfo", userInfo);
//     return response.data;
//   } catch (error: unknown) {

//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError<any>;
//       console.error("❌ Axios Error:", axiosError.response?.data || axiosError.message);
//       throw new Error(
//         axiosError.response?.data?.detail || axiosError.message || "Server error"
//       );
//     } else {
//       console.error("❌ Unexpected Error:", error);
//       throw new Error("Unexpected error occurred");
//     }
//   }
// }


// // export const getUserInfo = async (data: {username:string }) => {
// //   return api.get("/user/getUserInfo/" + data.username)
// // }