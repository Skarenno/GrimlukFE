import type { Transaction } from "../../../models/User";
import TransferItem from "./TransactionItem";

interface Props {
  transactions: Transaction[];
}

export default function TransfersGrid({ transactions }: Props) {
  if (!transactions.length) {
    return (
      <p className="text-gray-400 text-center py-8">
        No transactions found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {transactions.map(tx => (
        <TransferItem key={tx.id} transaction={tx} />
      ))}
    </div>
  );
}
