import { useState } from "react";
import type { Account } from "../../models/User";

interface Props {
  open: boolean;
  onClose: () => void;
  account: Account;
  allAccounts: Account[];
  onConfirm: (options: { targetAccountId: number | null }) => void;
}

export default function BlockAccountModal({
  open,
  onClose,
  account,
  allAccounts,
  onConfirm,
}: Props) {
  const [targetId, setTargetId] = useState<number | null>(null);
  const [confirmText, setConfirmText] = useState("");

  if (!open) return null;

  // Accounts user can transfer to (optional)
  const selectableAccounts = allAccounts.filter(
    (a) => a.id !== account.id && a.status !== "deleted"
  );

  const canConfirm = confirmText.trim().toUpperCase() === "BLOCK";

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({ targetAccountId: targetId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className=" dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">
          Block This Account?
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Blocking <strong>{account.account_type.toUpperCase()}</strong> account{" "}
          <strong>{account.account_number}</strong> is permanent.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-1">
         <strong>• Cards will be instantly blocked.</strong> 
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
         <strong>• If you don`t transfer the money to another account, funds will be blocked</strong> 
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Transfer to:
        </p>

        <select
          className="w-full p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700 mb-4"
          value={targetId || ""}
          onChange={(e) =>
            setTargetId(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">No transfer</option>
          {selectableAccounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.account_type.toUpperCase()} — {acc.account_number}
            </option>
          ))}
        </select>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Type <strong className="text-red-500">BLOCK</strong> to confirm:
        </p>

        <input
          type="text"
          className="w-full p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700 mb-6"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            disabled={!canConfirm}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition
              ${canConfirm
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-400 cursor-not-allowed"
              }`}
            onClick={handleConfirm}
          >
            Block Account
          </button>
        </div>
      </div>
    </div>
  );
}
