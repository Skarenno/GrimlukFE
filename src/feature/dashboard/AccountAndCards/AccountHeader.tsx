import { FaChevronDown } from "react-icons/fa";
import type { Account } from "../../../models/User";

interface Props {
  account: Account;
  isBlocked: boolean;
  isSelected: boolean;
  onToggle: () => void;
}

export default function AccountHeader({
  account,
  isBlocked,
  isSelected,
  onToggle,
}: Props) {
  return (
    <button
      className={`w-full text-left p-6 flex justify-between items-center 
        ${isBlocked ? "bg-red-50 dark:bg-red-900/20" : ""}`}
      onClick={onToggle}
    >
      <div>
        <h3
          className={`text-lg font-semibold ${
            isBlocked
              ? "text-red-700 dark:text-red-400"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {account.account_type.toUpperCase()} ACCOUNT
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {account.account_number}
        </p>

        {isBlocked && (
          <p className="text-xs mt-1 text-red-600 dark:text-red-400">
            Deleted on:{" "}
            {new Date(account.updated_at ?? "").toLocaleDateString("it-IT")}
          </p>
        )}
      </div>

      <FaChevronDown
        className={`transition-transform ${
          isSelected ? "rotate-180" : ""
        } ${isBlocked ? "text-red-500" : "text-gray-400"}`}
      />
    </button>
  );
}
