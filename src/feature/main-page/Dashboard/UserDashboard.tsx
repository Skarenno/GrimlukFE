import {
  FaExchangeAlt
} from "react-icons/fa";

import { AccountCard } from "./AccountCard";
import { CreateAccountCard } from "../AccountAndCards/CreateCard";
import { type User } from "../../../models/User";
import MakeTransferModal from "../../modals/Transfer";
import { useState } from "react";
import { CardList } from "./CardsList";
import { TransactionList } from "./TransactionList";
import { AccountStatus } from "../../utils/enums";

const maxAccount = import.meta.env.VITE_MAX_ACCOUNT_NUMBER

interface Props {
  user: User;
  onCreateAccount: () => void;

}

export function UserDashboard({ user, onCreateAccount }:Props) {
  const activeAccounts =user.accounts.filter(acct => acct.status == AccountStatus.Active)

  const cards = user.cards || [];
  const transactions = user.transactions || []; 
  const [showTransfer, setShowTransfer] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <section className="text-left">
        <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400">
          Welcome, {user.userInfo.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Here are some info about your Grimluk accounts.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Your Active Accounts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAccounts.map((acct, idx) => (
            <AccountCard key={idx} account={acct} />  
          ))}
          { activeAccounts.length < maxAccount && <CreateAccountCard onClick={onCreateAccount} />} 
        </div>
      </section>

      <CardList cards={cards} accounts={activeAccounts}/>

      <section className="grid grid-cols-1 lg:grid-cols-1 gap-6"> {/*lg:grid-cols-2 if other div */}
        <TransactionList transactions={transactions} />

        <div className="dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col space-y-4 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            onClick={() => setShowTransfer(!showTransfer)}
          >
            <FaExchangeAlt className="inline mr-2" /> New Transfer
          </button>
        </div>
      </section>

      {showTransfer && (
        <MakeTransferModal user={user} onClose={() => setShowTransfer(false)} />
      )}
    </div>
  );
}