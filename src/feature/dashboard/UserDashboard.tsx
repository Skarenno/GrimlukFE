import {
  FaExchangeAlt,
  FaArrowDown,
  FaArrowUp
} from "react-icons/fa";

import { type User } from "../../models/User";
import MakeTransferModal from "../modals/transfer";
import { useState } from "react";

interface Props {
  user: User;
}

export function UserDashboard({ user }: Props) {
  const accounts = user.accounts || [];
  const cards = user.cards || [];
  const transactions = user.transactions || [];
  const [showTransfer, setShowTransfer] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Welcome Header */}
      <section className="text-left">
        <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400">
          Welcome, {user.userInfo.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Here are some info about your Grimluk account.
        </p>
      </section>

      {showTransfer && <MakeTransferModal user={user} onClose={() => setShowTransfer(false)} />}

      <section>
        <h3 className="text-xl font-semibold mb-4">Your accounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acct, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-300"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {acct.account_number || "Bank Account"}
              </p>
              <h4 className="text-lg font-semibold mt-2">{acct.account_type.toUpperCase()} ACCOUNT</h4>
              <div className="flex justify-left items-center">
                <p className="text-2xl font-bold mt-4 text-green-700 dark:text-green-400 pr-4">Balance: </p>
                <p className="text-2xl font-bold mt-4">
                  {acct.balance.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                  })}
                  {" "}
                  {acct.currency}
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Last update: {acct.updated_at || "today"}
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* Cards Section */}
      {cards.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Le tue carte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 flex justify-between items-center shadow-sm transition-colors duration-300"
              >
                <div>
                  <p className="font-medium">{card.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    **** **** **** {card.last4}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Expires: {card.expiry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Transactions + Quick Actions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-4">Recent transactions</h3>
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
                      className={`py-2 text-right ${tx.amount < 0 ? "text-red-500" : "text-green-500"
                        }`}
                    >
                      {tx.amount < 0 ? <FaArrowDown className="inline mr-1" /> : <FaArrowUp className="inline mr-1" />}
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

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col space-y-4 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-4">Quick actions</h3>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition" onClick={() => setShowTransfer(!showTransfer)}>
            <FaExchangeAlt className="inline mr-2" /> New transfer
          </button>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Pay bill
          </button>
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
            Phone charge
          </button>
        </div>
      </section>
    </div>
  );
}