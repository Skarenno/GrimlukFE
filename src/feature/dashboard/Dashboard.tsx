import { useState, useEffect, useRef } from "react";
import { UserDashboard } from "./UserDashboard";
import { EmptyDashboard } from "./EmptyDashboard";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ProfileSettings } from "../profile-settings/ProfileSettings";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthenticationContext";
import { getAccounts, getCards, getTransactions } from "../../api/account/account-service";
import { RedirectingToHome } from "../utils/RedirectingToHome";
import { getUserInfo } from "../../api/user/user-info-service";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [redirectHome, setRedirectHome] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { logout } = useAuth();

  // ✅ Ref to prevent double fetch in Strict Mode
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!user?.userInfo?.id) return; // wait until user exists
    if (fetchedOnce.current) return;  // skip if already fetched
    fetchedOnce.current = true;

    let ignore = false;

const fetchUserData = async () => {
  setLoading(true);
  try {
    // getUserInfo returns AxiosResponse<UserInfo>
    const response = await getUserInfo({ user_id: user.userInfo.id });
    const userInfo = response.data;
    console.log("Fetched user info:", userInfo);

    const [accounts, cards, transactions] = await Promise.all([
      getAccounts(user.userInfo.id),
      //getCards(user.userInfo.id),
      //getTransactions(user.userInfo.id),
      [],
      []
    ]);

    console.log("Fetched accounts:", accounts);

    setUser(prev =>
      prev
        ? {
            ...prev,
            userInfo: userInfo,
            accounts: accounts ?? [],
            cards: cards ?? [],
            transactions: transactions ?? [],
          }
        : prev
    );
  } catch (err: any) {
    console.error(err);
    if (err.response?.status !== 404) setRedirectHome(true);
  } finally {
    setLoading(false);
  }
};


    fetchUserData();

    return () => {
      ignore = true; // prevent state updates if component unmounts
    };
  }, [user?.userInfo?.id, setUser]);

  // Redirect if no user or API returned 404
  if (!user || redirectHome) return <RedirectingToHome />;

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-200 text-lg">Loading dashboard...</p>
      </div>
    );

  return (
    <div className={`dark flex flex-col h-screen`}>
      <Header user={user} setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar
            logout={logout}
            show={showSidebar}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        <main className="flex-1 p-8 overflow-auto bg-gray-100 dark:bg-gray-900">
          {activeTab === "dashboard" && (
            user.accounts.length > 0 ? <UserDashboard user={user} /> : <EmptyDashboard />
          )}
          {activeTab === "profile" && <ProfileSettings user={user} />}
          {/* Add other tabs here:
              {activeTab === "accounts" && <AccountsAndCards user={user} />}
              {activeTab === "transfers" && <Transfers user={user} />}
          */}
        </main>
      </div>
    </div>
  );
}
