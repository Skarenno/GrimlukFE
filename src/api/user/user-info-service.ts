import { createApiClient } from "../apiClient";
import type { UserInfoRequest } from "./requests";

const api = createApiClient(import.meta.env.VITE_API_USER_URL);

export async function submitUserInfo(userInfo: UserInfoRequest) {
  const response = await api.post("/updateUserInfo", userInfo);
  return response.data;
}

export const getUserInfo = async (data: { user_id: number }) => {
  return api.get(`/getUserInfo/${data.user_id}`);
};
