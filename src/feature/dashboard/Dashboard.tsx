import { useState, useEffect, useRef } from "react";
import { UserDashboard } from "./UserDashboard";
import { EmptyDashboard } from "./EmptyDashboard";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ProfileSettings } from "../profile-settings/ProfileSettings";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthenticationContext";
import { getAccounts } from "../../api/account/account-service";
import { RedirectingToHome } from "../utils/RedirectingToHome";
import { getUserInfo } from "../../api/user/user-info-service";
import CreateAccountModal from "../modals/newAccount";
import Accounts from "./AccountAndCards/Accounts";
import CardSettingsModal from "../modals/CardSettings";
import type { Account, Card } from "../../models/User";
import CreateCardModal from "../modals/CardCreate";
import { getCards } from "../../api/account/card-service";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditCard, setShowEditCard] = useState<Card | null>(null);
  const [showCreateCard, setShowCreateCard] = useState<Account | null>(null);

  const { user, setUser } = useUser();
  const { logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [redirectHome, setRedirectHome] = useState(false);
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!user?.userInfo?.id) return;
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getUserInfo({ user_id: user.userInfo.id });
        const userInfo = response.data;

        const [accounts, cards, transactions] = await Promise.all([
          getAccounts(user.userInfo.id),
          getCards(user.userInfo.id),
          //getTransactions(user.userInfo.id),
          []
        ]);

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
  }, [user?.userInfo?.id, setUser]);

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
          {activeTab === "dashboard" &&
            (user.accounts.length > 0 ? (
              <UserDashboard user={user} onCreateAccount={() => setShowCreateModal(true)} />
            ) : (
              <EmptyDashboard user={user} onCreateAccount={() => setShowCreateModal(true)} />
            ))}

          {activeTab === "profile" && <ProfileSettings user={user} />}
          {activeTab === "accounts" && <Accounts user={user} onEditCard={setShowEditCard} onCreateCard={setShowCreateCard}></Accounts>}
        </main>
      </div>

      {showCreateModal && (
        <CreateAccountModal
          user={user}
          onClose={() => setShowCreateModal(false)}
          onSubmit={async () => {
            try {
              const updatedAccounts = await getAccounts(user.userInfo.id); 
              setUser((prev) =>
                prev ? { ...prev, accounts: updatedAccounts ?? [] } : prev
              );

            } catch (err) {
              console.error("Failed to create account:", err);
            } finally {
              setShowCreateModal(false);

            }
          }} />
      )}

      {showEditCard && (
        <CardSettingsModal
          card={showEditCard}
          onClose={() => setShowEditCard(null)}
          onSave={async () => {
            try {
              const updatedCards = await getCards(user.userInfo.id);
              setUser((prev) =>
                prev ? { ...prev, cards: updatedCards ?? [] } : prev
              );

            } catch (err) {
              console.error("Failed to create card:", err);
            } finally {
              setShowEditCard(null)
            }
          }}
        />
      )}

      {showCreateCard && (

        <CreateCardModal
          account={showCreateCard}
          onClose={() => setShowCreateCard(null)}
          onSubmit={async () => {
            try {
              const updatedCards = await getCards(user.userInfo.id);
              setUser((prev) =>
                prev ? { ...prev, cards: updatedCards ?? [] } : prev
              );

            } catch (err) {
              console.error("Failed to create card:", err);
            } finally {
              setShowCreateCard(null)

            }

          }}
        />

      )}

    </div>
  );
}
