import { useState } from "react";
import type { User, Card, Account } from "../../../models/User";
import AccountItem from "./AccountItem";
import groupCards from "../../utils/groupCards";
import { deleteAccount, getAccounts } from "../../../api/account/account-service";
import { type AccountDeleteRequest } from "../../../api/account/requests";
import { useUser } from "../../../context/UserContext";

interface Props {
  user: User;
  onEditCard: (card: Card) => void;
  onCreateCard: (account: Account) => void;
}

export default function Accounts({ user, onEditCard, onCreateCard }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { dUser, setUser } = useUser();

  const accounts = user.accounts;
  const cardsByAccount = groupCards(user.cards);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-semibold text-green-700 dark:text-green-400">
        Your Accounts & Cards
      </h2>

      <p className="text-gray-600 dark:text-gray-300">
        Select an account to view its details and linked cards.
      </p>

      <div className="flex flex-col gap-6">
        {accounts.map((account, idx) => (
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

              try{
                await deleteAccount(accountDeleteRequest)
                const updatedAccounts = await getAccounts(user.userInfo.id)
                setUser((prev) =>
                prev ? { ...prev, accounts: updatedAccounts ?? [] } : prev
              );
              } catch(err){
                console.log(err)
              }

            }}
          />
        ))}
      </div>
    </div>
  );
}
