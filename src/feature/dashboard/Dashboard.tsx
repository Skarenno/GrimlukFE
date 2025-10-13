import { useState } from "react";
import { UserDashboard } from "./UserDashboard";
import { type User, mockUserEmpty, mockUserFilled } from "../../models/User"
import { EmptyDashboard } from "../dashboard/EmptyDashboard"
import { Header } from "./Header";
import {
  FaCreditCard,
  FaHome,
  FaExchangeAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthenticationContext";
import { FaPerson } from "react-icons/fa6";


export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const { logout } = useAuth();

  const user:User = mockUserEmpty
  //const user:User = mockUserFilled

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex-1 flex flex-col overflow-auto">
        <Header user={user} setShowSidebar={setShowSidebar} showSidebar={showSidebar}></Header>

        <div className="flex h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
          {showSidebar && (
            <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm flex flex-col transition-colors duration-300">
              <div className="p-6 text-2xl font-bold text-green-700 dark:text-green-400">
                Grimluk Banking
              </div>
              <nav className="flex-1 px-4 space-y-2">
                <NavItem icon={<FaHome />} label="Dashboard" />
                <NavItem icon={<FaCreditCard />} label="Accounts & Cards" />
                <NavItem icon={<FaExchangeAlt />} label="Transfers" />
                <NavItem icon={<FaPerson />} label="Profile settings" />
              </nav>
              <div className="p-4 border-t dark:border-gray-700">
                <button className="flex items-center w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition" onClick={logout}>
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </aside>
          )}



          <main className="p-8 flex flex-col items-center justify-center flex-1 text-center">
            {user.accounts && user.accounts.length > 0 ? (
              <UserDashboard user={user} />
            ) : (
              <EmptyDashboard />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}




function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
      <span className="mr-3 text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}


