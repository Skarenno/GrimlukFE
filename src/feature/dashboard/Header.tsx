import {
    FaInfo
} from "react-icons/fa";

interface HeaderProps {
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Header({ showSidebar, setShowSidebar }: HeaderProps) {


    return <header className="flex items-center justify-between dark:bg-gray-800 p-4 shadow transition-colors duration-300">
        <div className="flex items-center">
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
            <div className="pl-4 text-2xl font-bold text-green-700 dark:text-green-400">
                Grimluk Banking
            </div>
        </div>




        <div className="flex items-center space-x-4 pr-8">
            <FaInfo className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-green-500 cursor-pointer transition" />

        </div>
    </header>
}