import { FaChevronDown } from "react-icons/fa";
import type { Account } from "../../../models/User";
import { AccountStatus } from "../../utils/enums";

interface Props {
  account: Account;
  status: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function AccountHeader({
  account,
  status,
  isSelected,
  onToggle,
}: Props) {

  const isBlocked = status === AccountStatus.Deleted;
  const isInBlocking = status === AccountStatus.InDeletion;

  const containerColor =
    isBlocked
      ? "bg-red-50 dark:bg-red-900/20"
      : isInBlocking
      ? "bg-yellow-50 dark:bg-yellow-900/20"
      : "";

  const titleColor =
    isBlocked
      ? "text-red-700 dark:text-red-400"
      : isInBlocking
      ? "text-yellow-700 dark:text-yellow-400"
      : "text-gray-800 dark:text-gray-100";

  const iconColor =
    isBlocked
      ? "text-red-500"
      : isInBlocking
      ? "text-yellow-500"
      : "text-gray-400";

  return (
    <button
      className={`w-full text-left p-6 flex justify-between items-center ${containerColor}`}
      onClick={onToggle}
    >
      <div>
        <h3 className={`text-lg font-semibold ${titleColor}`}>
          {account.account_type.toUpperCase()} ACCOUNT
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {account.account_number}
        </p>

        {(isBlocked || isInBlocking) && (
          <p
            className={`text-xs mt-1 ${
              isBlocked
                ? "text-red-600 dark:text-red-400"
                : "text-yellow-600 dark:text-yellow-400"
            }`}
          >
            Status: {status.replace("_", " ")}
          </p>
        )}

      </div>

      <FaChevronDown
        className={`transition-transform ${
          isSelected ? "rotate-180" : ""
        } ${iconColor}`}
      />
    </button>
  );
}
