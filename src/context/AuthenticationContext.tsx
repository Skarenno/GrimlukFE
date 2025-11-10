// AuthenticationContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserInfo } from "../models/User";

interface AuthContextType {
  jwt: string | null;
  refreshJwt:string|null;
  login: (token: string, refreshToken:string, userInfo: UserInfo) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [jwt, setJwt] = useState<string | null>(() => localStorage.getItem("jwt"));
  const [refreshJwt, setRefreshJwt] =  useState<string | null>(() => localStorage.getItem("refreshJwt"));

  const login = (token: string, refreshToken:string, userInfo: UserInfo) => {
    localStorage.setItem("jwt", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setJwt(token);
    setRefreshJwt(refreshToken)
  };


  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userInfo")
    setJwt(null);
  };

  const isAuthenticated = !!jwt; // true if jwt exists

  return (
    <AuthContext.Provider value={{ jwt, refreshJwt, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};



