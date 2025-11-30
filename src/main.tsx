import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthenticationContext";
import App from "./App";
import Home from "./feature/landing-page/Home";
import MainPage from "./feature/dashboard/MainPage";
import { ProtectedRoute } from "./components/Protected";
import { UserProvider } from "./context/UserContext";
import { ErrorProvider } from "./context/ErrorContext";
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <ErrorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
              </Route>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </ErrorProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);



