import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type User } from "../models/User";
import { getUserInfo } from "../api/user/user-info-service"; // assume you have this API call

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshUser: () => Promise<void>;
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

  const refreshUser = useCallback(async () => {
    if (!user?.userInfo?.username) return;
    try {
      const response = await getUserInfo({ user_id: user.userInfo.id }); 
      const updatedUserInfo = response.data; 

      const newUser = { ...user, userInfo: updatedUserInfo };
      setUser(newUser);
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } catch (err) {
      console.error("Failed to refresh user info:", err);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
