import type { Account } from "../../../models/User";


interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  return (
    <div className="dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-300">
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {account.account_number || "Bank Account"}
      </p>

      <h4 className="text-lg font-semibold mt-2">
        {account.account_type?.toUpperCase() || "ACCOUNT"}
      </h4>

      <div className="flex justify-left items-center">
        <p className="text-2xl font-bold mt-4 text-green-700 dark:text-green-400 pr-4">
          Balance:
        </p>
        <p className="text-2xl font-bold mt-4">
          {Number(account.balance).toLocaleString("it-IT", {
            minimumFractionDigits: 2,
          })}{" "}
          {account.currency}
        </p>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
        Last update: {
          account.updated_at
            ? new Date(account.updated_at).toLocaleDateString("it-IT")
            : "today"
        }
      </p>
    </div>
  );
}
