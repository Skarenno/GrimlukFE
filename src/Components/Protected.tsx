import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthenticationContext";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};
