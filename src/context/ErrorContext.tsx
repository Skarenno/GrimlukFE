import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import { ErrorPopup } from "../feature/error/ErrorPopup";

interface ErrorContextType {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used within ErrorProvider");
  return ctx;
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
  };

  // ✅ Listen for dispatched global events (from Axios interceptors)
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      showError(customEvent.detail);
    };

    window.addEventListener("globalError", handler);
    return () => window.removeEventListener("globalError", handler);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage(null)} />
    </ErrorContext.Provider>
  );
};
