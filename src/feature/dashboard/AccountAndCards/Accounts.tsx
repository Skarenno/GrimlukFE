import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { User, Card, Account } from "../../../models/User";
import { FaChevronDown } from "react-icons/fa";
import { DetailedCard } from "./DetailedCard";
import { DetailedCardBlocked } from "./DetailedBlockedCard";

interface Props {
  user: User;
  onEditCard: (card: Card) => void;
  onCreateCard: (acount: Account) => void;
}

export default function Accounts({ user, onEditCard, onCreateCard }: Props) {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const accounts = user.accounts;
  const cards = user.cards || [];

  const getCardsForAccount = (accountId: number): Card[] => {
    return cards.filter((card) => card.account_id === accountId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400">
        Your Accounts & Cards
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Select an account to view its details and linked cards.
      </p>

      <div className="flex flex-col gap-6">
        {accounts.map((account, idx) => {
          const isSelected = selectedAccount === idx;
          const linkedCards = getCardsForAccount(account.id);

          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center"
                onClick={() => setSelectedAccount(isSelected ? null : idx)}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {account.account_type.toUpperCase()} ACCOUNT
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {account.account_number}
                  </p>
                </div>
                <FaChevronDown
                  className={`transition-transform ${isSelected ? "rotate-180 text-green-500" : "text-gray-400"
                    }`}
                />
              </button>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 border-t dark:border-gray-700"
                  >
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Balance
                      </p>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {Number(account.balance).toLocaleString("it-IT", {
                          style: "currency",
                          currency: account.currency,
                        })}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                        <div>
                          <p>Currency:</p>
                          <p className="font-medium">{account.currency}</p>
                        </div>
                        <div>
                          <p>Account Type:</p>
                          <p className="font-medium">{account.account_type}</p>
                        </div>
                        <div>
                          <p>Branch Code:</p>
                          <p className="font-medium">{account.branch_code || "-"}</p>
                        </div>
                        <div>
                          <p>Opened:</p>
                          <p className="font-medium">
                            {new Date(account.opened_at || "").toLocaleDateString("it-IT")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {linkedCards.length > 0 ? (
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Linked Cards</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {linkedCards.map((card, i) => (
                            card.status == "blocked" ? <DetailedCardBlocked card={card} key={i}></DetailedCardBlocked> : <DetailedCard key={i} card={card} onSettings={() => onEditCard(card)} />
                          ))}
                          <div className="mt-4">
                            <button
                              onClick={() => onCreateCard(account)}
                              className="w-full flex justify-center items-center gap-2 py-3 rounded-xl border-2 border-dashed border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 transition"
                            >
                              <span className="text-xl font-bold">+</span> Add New Card
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-500 italic pb-4">
                          No cards linked to this account.
                        </p>
                        <button
                          onClick={() => onCreateCard(account)}
                          className="w-full flex justify-center items-center gap-2 py-3 rounded-xl border-2 border-dashed border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 transition"
                        >
                          <span className="text-xl font-bold">+</span> Add New Card
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}


      </div>
    </div>
  );
}


