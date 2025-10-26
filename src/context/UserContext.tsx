import { createContext, useContext, useState, type ReactNode } from "react";
import { type User } from "../models/User";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("userInfo");
    return stored
      ? { userInfo: JSON.parse(stored), accounts: [], cards: [], transactions: [] }
      : null;
  });

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
