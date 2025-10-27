import { FaCreditCard, FaHome, FaExchangeAlt, FaUserCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  show: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  tab: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, tab, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-2 rounded transition
        ${active
          ? "bg-green-600 text-white"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        }
      `}
    >
      <span className="mr-3 text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export const Sidebar = ({ logout, show, activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside
      className={`
        w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${show ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <nav className="flex-1 px-4 space-y-2 overflow-auto py-4">
        <NavItem
          icon={<FaHome />}
          label="Dashboard"
          tab="dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <NavItem
          icon={<FaCreditCard />}
          label="Accounts & Cards"
          tab="accounts"
          active={activeTab === "accounts"}
          onClick={() => setActiveTab("accounts")}
        />
        <NavItem
          icon={<FaExchangeAlt />}
          label="Transfers"
          tab="transfers"
          active={activeTab === "transfers"}
          onClick={() => setActiveTab("transfers")}
        />
        <NavItem
          icon={<FaUserCog />}
          label="Profile Settings"
          tab="profile"
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};
