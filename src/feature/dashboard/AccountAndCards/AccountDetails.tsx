import { useState } from "react";
import type { Account, Card } from "../../../models/User";
import DetailRow from "./DetailRow";
import CardSection from "./CardSection";
import BlockAccountModal from "../../modals/BlockAccountModal";
import { AccountStatus } from "../../utils/enums";

interface Props {
  account: Account;
  cards: Card[];
  allAccounts: Account[];
  status: string;
  onEditCard: (card: Card) => void;
  onCreateCard: (account: Account) => void;
  onBlockAccount: (options: { targetAccountId: number | null }) => void;
}

export default function AccountDetails({
  account,
  cards,
  allAccounts,
  status,
  onEditCard,
  onCreateCard,
  onBlockAccount,
}: Props) {
  const [showBlockModal, setShowBlockModal] = useState(false);

  const isBlocked = status === AccountStatus.Deleted;
  const isInBlocking = status === AccountStatus.InDeletion;

  const balanceColor =
    isBlocked
      ? "text-red-600 dark:text-red-400"
      : isInBlocking
      ? "text-yellow-700 dark:text-yellow-400"
      : "text-green-700 dark:text-green-400";

  return (
    <>
      {/* Balance */}
      <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>

      <p className={`text-2xl font-bold ${balanceColor}`}>
        {Number(account.balance).toLocaleString("it-IT", {
          style: "currency",
          currency: account.currency,
        })}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
        <DetailRow
          label="Currency"
          value={account.currency}
          alert={isBlocked || isInBlocking}
        />
        <DetailRow label="Account Type" value={account.account_type} />
        <DetailRow label="Branch Code" value={account.branch_code || "-"} />
        <DetailRow
          label="Opened"
          value={new Date(account.opened_at || "").toLocaleDateString("it-IT")}
        />
      </div>

      {/* Status message */}
      {(isBlocked || isInBlocking) && (
        <p
          className={`mt-3 text-sm font-medium ${
            isBlocked
              ? "text-red-600 dark:text-red-400"
              : "text-yellow-600 dark:text-yellow-400"
          }`}
        >
          {isBlocked
            ? "This account is blocked."
            : "This account is currently being blocked."}
        </p>
      )}

      {/* Linked Cards */}
      <CardSection
        cards={cards}
        account={account}
        isBlocked={isBlocked || isInBlocking}
        onEditCard={onEditCard}
        onCreateCard={onCreateCard}
      />

      {/* Block Account Button */}
      {!isBlocked && !isInBlocking && (
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
