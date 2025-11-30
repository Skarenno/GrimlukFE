import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa";
import type { Transaction } from "../../../models/User";
import { TransactionStatus } from "../../utils/enums";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const truncate = (text: string | null | undefined, max = 25) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

      {transactions.length > 0 ? (

        <table className="w-full text-left">
          <thead className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <tr>
              <th className="pb-2">Date</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Description</th>
              <th className="pb-2">From</th>
              <th className="pb-2">To</th>
              <th className="pb-2">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {transactions.map((tx, idx) => {

              const directionColor =
                tx.status == TransactionStatus.REJECTED ?
                  "text-gray-500" :
                  tx.direction === "OUT"
                    ? "text-red-500"
                    : tx.direction === "IN"
                      ? "text-green-500"
                      : "text-blue-400";

              const statusColor =
                tx.status === TransactionStatus.REJECTED
                  ? "text-red-500"
                  : tx.status === TransactionStatus.VALIDATED
                    ? "text-green-500"
                    : "text-yellow-400";

              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-2">{formatDate(tx.created_at)}</td>
                  <td className={`py-2 ${statusColor}`}>{tx.status}</td>
                  <td className="py-2" title={tx.description || ""}>
                    {truncate(tx.description, 25)}
                  </td>
                  <td className="py-2">{tx.s_account_number}</td>
                  <td className="py-2">{tx.r_account_number}</td>


                  <td className={`py-2 ${directionColor} ${tx.status === TransactionStatus.REJECTED ? "line-through" : ""}`}>
                    {tx.direction === "OUT" && <FaArrowDown className="inline mr-1" />}
                    {tx.direction === "IN" && <FaArrowUp className="inline mr-1" />}
                    {tx.direction === "FLAT" && <FaMinus className="inline mr-1" />}

                    {Math.abs(tx.amount).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </td>
                </tr>
              );
            })}

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
