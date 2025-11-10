// src/api/apiClient.ts
import axios, { AxiosError, type AxiosInstance } from "axios";
import { isTokenExpired } from "../feature/utils/utils";

let refreshedToken: Promise<string> | null = null;

export async function refresh(
  refresh_token: string
): Promise<{ jwt_token: string; refresh_token: string }> {
  try {
    console.log("Refreshing with: " + refresh_token)
    const response = await axios.get(
      `${import.meta.env.VITE_API_USER_URL}/refreshToken`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refresh_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error;
  }
}

export const createApiClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("checking refresh")
    // Token expired and we have a refresh token
    if (token && isTokenExpired(token) && refreshToken) {
      console.log("token expired")
      config.headers.Authorization =  `Bearer ${refreshToken}`
      try {
        if (!refreshedToken) {
          refreshedToken = refresh(refreshToken).then((data) => {
            localStorage.setItem("jwt", data.jwt_token);
            refreshedToken = null;
            return data.jwt_token;
          });
        }

        const newToken = await refreshedToken;
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (err) {
        refreshedToken = null;
        console.error("Token refresh failed", err);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Optionally handle 401 globally
  api.interceptors.response.use(
    (res) => res,
    (err: AxiosError) => {
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/";
      }
      return Promise.reject(err);
    }
  );

  return api;
};
