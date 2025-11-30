import { AnimatePresence, motion } from "framer-motion";
import type { Account, Card } from "../../../models/User";
import AccountHeader from "./AccountHeader";
import AccountDetails from "./AccountDetails";

interface Props {
  account: Account;
  cards: Card[];
  allAccounts: Account[];
  isSelected: boolean;
  onToggle: () => void;
  onEditCard: (card: Card) => void;
  onCreateCard: (account: Account) => void;
  onBlockAccount: (options: { targetAccountId: number | null }) => void;
}

export default function AccountItem({
  account,
  cards,
  allAccounts,
  isSelected,
  onToggle,
  onEditCard,
  onCreateCard,
  onBlockAccount,
}: Props) {
  const status = account.status

  return (
    <div className="dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all">
      
      {/* Header */}
      <AccountHeader
        account={account}
        status={status}
        isSelected={isSelected}
        onToggle={onToggle}
      />

      {/* Expandable Content */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 border-t dark:border-gray-700"
          >
            <AccountDetails
              account={account}
              cards={cards}
              allAccounts={allAccounts}
              status={status}
              onEditCard={onEditCard}
              onCreateCard={onCreateCard}
              onBlockAccount={onBlockAccount}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
