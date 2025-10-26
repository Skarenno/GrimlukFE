import { FaCreditCard, FaHome, FaExchangeAlt, FaPersonBooth, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  logout: () => void;
  show: boolean;
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
      <span className="mr-3 text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export const Sidebar = ({ logout, show }: SidebarProps) => {
  return (
    <aside
      className={`
        w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${show ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-6 text-2xl font-bold text-green-700 dark:text-green-400">
        Grimluk Banking
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-auto">
        <NavItem icon={<FaHome />} label="Dashboard" />
        <NavItem icon={<FaCreditCard />} label="Accounts & Cards" />
        <NavItem icon={<FaExchangeAlt />} label="Transfers" />
        <NavItem icon={<FaPersonBooth />} label="Profile settings" />
      </nav>

      <div className="p-4 border-t dark:border-gray-700">
        <button
          className="flex items-center w-full text-left px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          onClick={logout}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};
