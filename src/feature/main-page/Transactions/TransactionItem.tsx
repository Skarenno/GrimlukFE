import type { Transaction } from "../../../models/User";
import { FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa";

interface Props {
  transaction: Transaction;
}

export default function TransferItem({ transaction }: Props) {
  const isIn = transaction.direction === "POSITIVE";
  const isOut = transaction.direction === "NEGATIVE";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusColor = (status?: string) => {
    switch (status) {
      case "VALIDATED":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400";
      case "REJECTED":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800 shadow space-y-3">

      {/* HEADER ROW */}
      <div className="flex justify-between items-start gap-3">

        {/* LEFT INFO */}
        <div className="space-y-1">

          <p className="font-semibold text-gray-900 dark:text-white">
            {transaction.description || "Transfer"}
          </p>

          <p className="text-xs text-gray-500">
            {formatDate(transaction.created_at)}
          </p>

          {/* FROM → TO */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-mono">
              {transaction.s_account_number || "—"}
            </span>

            <span>→</span>

            <span className="font-mono">
              {transaction.r_account_number || "—"}
            </span>
          </div>
        </div>

        {/* AMOUNT + ICON */}
        <div className="flex items-center gap-2 font-semibold whitespace-nowrap">

          {isIn && <FaArrowDown className="text-green-500" />}
          {isOut && <FaArrowUp className="text-red-500" />}
          {!isIn && !isOut && <FaEquals className="text-blue-500" />}

          <span
            className={`${
              isIn ? "text-green-600" :
              isOut ? "text-red-500" :
              "text-blue-500"
            }`}
          >
            {Number(transaction.amount).toLocaleString("it-IT", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </div>

      </div>

      {/* TAGS */}
      <div className="flex gap-2 items-center ">

        {transaction.status && (
          <span
            className={`text-xs px-2 py-1 rounded-full font-semibold ${statusColor(transaction.status)}`}
          >
            {transaction.status}
          </span>
        )}

      {transaction.reject_reason && (
        <div className="text-xs text-red-500 rounded  dark: p-2">
          {transaction.reject_reason}
        </div>
      )}
      </div>
    </div>
  );
}
