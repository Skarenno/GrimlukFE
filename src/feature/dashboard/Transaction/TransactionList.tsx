import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import type { Transaction } from "../../../models/User";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

      {transactions.length > 0 ? (
        <table className="w-full text-left">
          <thead className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Description</th>
              <th className="pb-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {transactions.map((tx, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-2">{tx.date}</td>
                <td className="py-2">{tx.description}</td>
                <td
                  className={`py-2 text-right ${
                    tx.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tx.amount < 0 ? (
                    <FaArrowDown className="inline mr-1" />
                  ) : (
                    <FaArrowUp className="inline mr-1" />
                  )}
                  {Math.abs(tx.amount).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No recent transactions.
        </p>
      )}
    </div>
  );
}
