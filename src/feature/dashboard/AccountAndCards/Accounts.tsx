import { useState } from "react";
import type { User, Card, Account } from "../../../models/User";
import AccountItem from "./AccountItem";
import groupCards from "../../utils/groupCards";
import { deleteAccount, getAccounts } from "../../../api/account/account-service";
import { type AccountDeleteRequest } from "../../../api/account/requests";
import { useUser } from "../../../context/UserContext";
import { getCards } from "../../../api/account/card-service";

interface Props {
  currentUser: User;
  onEditCard: (card: Card) => void;
  onCreateCard: (account: Account) => void;
}

export default function Accounts({ currentUser, onEditCard, onCreateCard }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { user, setUser } = useUser();
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const accounts = currentUser.accounts;
  const cardsByAccount = groupCards(currentUser.cards);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400">
        Your Accounts & Cards
      </h2>

      <p className="text-gray-600 dark:text-gray-300">
        Select an account to view its details and linked cards.
      </p>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setShowActiveOnly((prev) => !prev)}
          className="px-4 py-2 rounded-lg border text-sm font-medium 
               border-green-600 text-green-700 dark:text-green-300 
               hover:bg-green-50 dark:hover:bg-green-900 transition"
        >
          {showActiveOnly ? "Show All Accounts" : "Show Active Accounts Only"}
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {accounts
          .filter((acc) => (showActiveOnly ? acc.status !== "deleted" : true))
          .map((account: Account, idx: number) => (
            <AccountItem
              key={account.id}
              account={account}
              cards={cardsByAccount[account.id] || []}
              isSelected={selectedIndex === idx}
              onToggle={() =>
                setSelectedIndex(selectedIndex === idx ? null : idx)
              }
              allAccounts={accounts}
              onEditCard={onEditCard}
              onCreateCard={onCreateCard}
              onBlockAccount={async (opts) => {
                const accountDeleteRequest: AccountDeleteRequest = {
                  deleteId: account.id,
                  transferId: opts.targetAccountId ?? undefined
                };

                try {
                  await deleteAccount(accountDeleteRequest)
                  const updatedAccounts = await getAccounts(currentUser.userInfo.id)
                  const updatedCards = await getCards(currentUser.userInfo.id)
                  setUser((prev) =>
                    prev ? { ...prev, accounts: updatedAccounts ?? [], cards: updatedCards ?? [] } : prev
                  );
                } catch (err) {
                  console.log(err)
                }

              }}
            />
          ))}
      </div>
    </div>
  );
}
