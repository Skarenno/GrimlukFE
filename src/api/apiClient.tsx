// src/api/apiClient.ts
import axios, { AxiosError, type AxiosInstance } from "axios";
import { isTokenExpired } from "../feature/utils/utils";

// ✅ Single shared refresh promise to avoid race conditions
let refreshedToken: Promise<string> | null = null;

/**
 * Refresh JWT using refresh token
 */
export async function refresh(
  refresh_token: string
): Promise<{ jwt_token: string; refresh_token: string }> {
  try {
    console.log("Refreshing with:", refresh_token);
    const response = await axios.get(
      `${import.meta.env.VITE_API_USER_URL}/refreshToken`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error;
  }
}

/**
 * Create API client with automatic JWT refresh + global error handling
 */
export const createApiClient = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  /**
   * ✅ Request interceptor
   * - Adds Authorization header
   * - Refreshes token if expired
   */
  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token && isTokenExpired(token) && refreshToken) {
      console.log("JWT expired → attempting refresh...");
      config.headers.Authorization = `Bearer ${refreshToken}`;

      try {
        if (!refreshedToken) {
          refreshedToken = refresh(refreshToken).then((data) => {
            localStorage.setItem("jwt", data.jwt_token);
            localStorage.setItem("refreshToken", data.refresh_token);
            refreshedToken = null;
            return data.jwt_token;
          });
        }

        const newToken = await refreshedToken;
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (err) {
        refreshedToken = null;
        console.error("Token refresh failed:", err);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });


  api.interceptors.response.use(
    (response) => {
      if (response.data?.detail) {
        window.dispatchEvent(
          new CustomEvent("globalError", { detail: response.data.detail })
        );
      }
      return response;
    },
    (error: AxiosError<any>) => {
      const status = error.response?.status;
      const data = error.response?.data;

      // Unauthorized
      if (status === 401) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      let message = "Unknown error occurred";

      // ✅ FastAPI validation error (422)
      if (status === 422 && Array.isArray(data?.detail)) {
        message = data.detail
          .map((err: any) => err.msg)
          .join(", ");
      }

      // ✅ Regular backend error
      else if (typeof data?.detail === "string") {
        message = data.detail;
      }

      // ✅ Fallback
      else if (data?.message) {
        message = data.message;
      } else if (status) {
        message = `Error ${status}`;
      }

      window.dispatchEvent(
        new CustomEvent("globalError", { detail: message })
      );

      return Promise.reject(error);
    }

  );

  return api;
};

export const api = createApiClient(import.meta.env.VITE_API_BFF_URL);
