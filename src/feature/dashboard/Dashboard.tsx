import { useState, useEffect } from "react";
import { UserDashboard } from "./UserDashboard";
import { EmptyDashboard } from "./EmptyDashboard";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthenticationContext";
import { getAccounts, getCards, getTransactions } from "../../api/account/account-service";
import { RedirectingToHome } from "../utils/RedirectingToHome";

export default function Dashboard() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth();

useEffect(() => {
  if (!user) {
    setLoading(false); 
    return;
  }

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [accounts, cards, transactions] = await Promise.all([
        getAccounts(user.userInfo.id),
        getCards(user.userInfo.id),
        getTransactions(user.userInfo.id),
      ]);
      setUser(prev => prev ? { ...prev, accounts, cards, transactions } : null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, [user]);

  if (!user) return <RedirectingToHome />;

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-200 text-lg">Loading dashboard...</p>
      </div>
    );

  return (
    <div className={`${darkMode ? "dark" : ""} flex flex-col h-screen`}>
      <Header user={user} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar logout={logout} show={showSidebar} />}
        <main className="flex-1 p-8 overflow-auto bg-gray-100 dark:bg-gray-900">
          {user.accounts.length > 0 ? <UserDashboard user={user} /> : <EmptyDashboard />}
        </main>
      </div>
    </div>
  );
}
