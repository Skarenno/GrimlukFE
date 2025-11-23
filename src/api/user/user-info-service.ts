import type { UserInfoRequest } from "./requests";
import { api } from "../apiClient";

const serviceName = "user"

export async function submitUserInfo(userInfo: UserInfoRequest) {
  const response = await api.post(`/${serviceName}/update`, userInfo);
  return response.data;
}

export const getUserInfo = async (data: { user_id: number }) => {
  return api.get(`/${serviceName}/info/${data.user_id}`);
};
