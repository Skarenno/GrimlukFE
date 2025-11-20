import { useState } from "react";
import type { Account, Card } from "../../../models/User";
import DetailRow from "./DetailRow";
import CardSection from "./CardSection";
import BlockAccountModal from "../../modals/BlockAccountModal";

interface Props {
  account: Account;
  cards: Card[];
  allAccounts: Account[];
  isBlocked: boolean;
  onEditCard: (card: Card) => void;
  onCreateCard: (account: Account) => void;
  onBlockAccount: (options: { targetAccountId: number | null }) => void;
}

export default function AccountDetails({
  account,
  cards,
  allAccounts,
  isBlocked,
  onEditCard,
  onCreateCard,
  onBlockAccount,
}: Props) {
  const [showBlockModal, setShowBlockModal] = useState(false);

  return (
    <>
      {/* Balance */}
      <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>

      <p
        className={`text-2xl font-bold ${
          isBlocked
            ? "text-red-600 dark:text-red-400"
            : "text-green-700 dark:text-green-400"
        }`}
      >
        {Number(account.balance).toLocaleString("it-IT", {
          style: "currency",
          currency: account.currency,
        })}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
        <DetailRow label="Currency" value={account.currency} alert={isBlocked} />
        <DetailRow label="Account Type" value={account.account_type} />
        <DetailRow label="Branch Code" value={account.branch_code || "-"} />
        <DetailRow
          label="Opened"
          value={new Date(account.opened_at || "").toLocaleDateString("it-IT")}
        />
      </div>

      {/* Linked Cards */}
      <CardSection
        cards={cards}
        account={account}
        isBlocked={isBlocked}
        onEditCard={onEditCard}
        onCreateCard={onCreateCard}
      />

      {/* Block Account Button */}
      {!isBlocked && (
        <div className="mt-8">
          <button
            onClick={() => setShowBlockModal(true)}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Block This Account
          </button>

          <BlockAccountModal
            open={showBlockModal}
            onClose={() => setShowBlockModal(false)}
            account={account}
            allAccounts={allAccounts}
            onConfirm={(options) => {
              onBlockAccount(options);
              setShowBlockModal(false);
            }}
          />
        </div>
      )}
    </>
  );
}
