import {
    FaBell
} from "react-icons/fa";
import type { User } from "../../models/User";

interface HeaderProps {
    user:User,
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Header({ user, showSidebar, setShowSidebar }: HeaderProps) {


    return <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow transition-colors duration-300">
        <div>
            <button
                className="text-gray-500 dark:text-gray-300 focus:outline-none "
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>

        <div className="flex items-center space-x-4">
            <FaBell className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-green-500 cursor-pointer transition" />
            <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-200">
                    Hi, {user.name}
                </span>
                <img
                    src="/path/to/avatar.jpg"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </div>
    </header>
}