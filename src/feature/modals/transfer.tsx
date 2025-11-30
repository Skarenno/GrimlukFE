import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import type { User } from "../../models/User";
import type { TransactionCreateRequest } from "../../api/transaction/requests";
import { createTransaction } from "../../api/transaction/transaction-service";

interface MakeTransferModalProps {
  user: User;
  onClose: () => void;
}

type TransferMode = "EXTERNAL" | "INTERNAL" | "SAME_USER";

export default function MakeTransferModal({ user, onClose }: MakeTransferModalProps) {

  const hasMultipleAccounts = user.accounts.length > 1;

  const [form, setForm] = useState({
    fromAccountId: "",
    internalReceivingAccountId: "",
    recipient: "",
    recipientIban: "",
    amount: "",
    description: "",
    mode: "EXTERNAL" as TransferMode
  });

  const hasSelectedFromAccount = Boolean(form.fromAccountId);

  const handleResetOnModeChange = (mode: TransferMode) => {
    setForm(prev => ({
      ...prev,
      mode,
      recipient: "",
      recipientIban: "",
      internalReceivingAccountId: ""
    }));
  };

  const selectedSendingAccount = user.accounts.find(
    acc => acc.id === Number(form.fromAccountId)
  );

  const availableReceivingAccounts = user.accounts.filter(
    acc => acc.id !== Number(form.fromAccountId)
  );

  const handleSubmit = async () => {
    if (!selectedSendingAccount) return;

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Invalid amount");
      return;
    }

    let r_account_id: number | null = null;
    let r_account_number = form.recipientIban;
    let is_internal = false;
    let is_same_user = false;

    if (form.mode === "SAME_USER") {
      const receiving = user.accounts.find(
        acc => acc.id === Number(form.internalReceivingAccountId)
      );

      if (!receiving) {
        alert("Select receiving account");
        return;
      }

      r_account_id = receiving.id;
      r_account_number = receiving.account_number;
      is_internal = true;
      is_same_user = true;
    }

    else if (form.mode === "INTERNAL") {
      if (!form.recipient || !form.recipientIban) {
        alert("Recipient name and IBAN required");
        return;
      }

      is_internal = true;
    }

    else {
      if (!form.recipient || !form.recipientIban) {
        alert("Recipient name and IBAN required");
        return;
      }
    }

    const transfer: TransactionCreateRequest = {
      user_id: user.userInfo.id,
      s_account_id: selectedSendingAccount.id,
      s_account_number: selectedSendingAccount.account_number,
      r_account_id,
      r_account_number,
      amount: form.amount,
      description: form.description || null,
      is_internal,
      is_blocking_account: false,
      is_same_user
    };

    await createTransaction(transfer);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
      >

        <div className="dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-5 relative">

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl"
          >✕</button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Make a Transfer
          </h2>

          {/* FROM ACCOUNT */}
          <div className="space-y-1">
            <label className="text-sm font-medium">From Account</label>
            <select
              value={form.fromAccountId}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  fromAccountId: e.target.value,
                  internalReceivingAccountId: "",
                  recipient: "",
                  recipientIban: ""
                }))
              }
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
            >
              <option value="">Select account</option>
              {user.accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.account_number} — {acc.currency} {acc.balance}
                </option>
              ))}
            </select>
          </div>

          {/* TRANSFER TYPE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Transfer Type
            </label>

            <div className="flex rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600">
              {[
                { label: "External", value: "EXTERNAL" },
                { label: "Grimluk User", value: "INTERNAL" },
                { label: "Your Account", value: "SAME_USER" }
              ].map(opt => {
                const disabled =
                  !hasSelectedFromAccount ||
                  (opt.value == "SAME_USER"  && !hasMultipleAccounts);

                const isActive = form.mode === opt.value;

                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleResetOnModeChange(opt.value as TransferMode)}
                    className={[
                      "flex-1 py-2 text-sm font-medium transition-colors select-none",
                      disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-green-500",
                      isActive
                        ? "bg-green-600 text-green-600 dark:text-green-600"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>


          {/* SAME USER ACCOUNT */}
          {form.mode === "SAME_USER" && (
            <div className="space-y-1">
              <label className="text-sm font-medium">To Your Account</label>

              <select
                value={form.internalReceivingAccountId}
                onChange={(e) =>
                  setForm(prev => ({ ...prev, internalReceivingAccountId: e.target.value }))
                }
                className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
              >
                <option value="">Select account</option>
                {availableReceivingAccounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.account_number} — {acc.currency} {acc.balance}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* RECIPIENT */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Recipient Name</label>

            <input
              type="text"
              disabled={!hasSelectedFromAccount || form.mode === "SAME_USER"}
              value={
                form.mode === "SAME_USER"
                  ? `${user.userInfo.name} ${user.userInfo.surname}`
                  : form.recipient
              }
              onChange={(e) => setForm(prev => ({ ...prev, recipient: e.target.value }))}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
            />
          </div>

          {/* IBAN */}
          {form.mode !== "SAME_USER" && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Recipient IBAN</label>
              <input
                type="text"
                disabled={!hasSelectedFromAccount}
                value={form.recipientIban}
                onChange={(e) => setForm(prev => ({ ...prev, recipientIban: e.target.value }))}
                className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
              />
            </div>
          )}

          {/* AMOUNT */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Amount (€)</label>
            <input
              type="number"
              disabled={!hasSelectedFromAccount}
              value={form.amount}
              onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <input
              type="text"
              disabled={!hasSelectedFromAccount}
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border dark:border-gray-600"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={!hasSelectedFromAccount}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 
                       text-white font-semibold text-lg transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Money
          </button>

        </div>
      </motion.div>
    </div>,
    document.body
  );
}
