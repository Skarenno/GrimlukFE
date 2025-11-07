import { useState } from "react";
import { motion } from "framer-motion";
import type { User } from "../models/User";

export default function MakeTransferModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [form, setForm] = useState({
    fromAccount: "",
    recipient: "",
    recipientIban: "",
    amount: "",
    description: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting transfer", form);
    // TODO: call transfer API
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 space-y-5 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Make a Transfer
          </h2>

          {/* From Account */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              From Account
            </label>
            <select
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              value={form.fromAccount}
              onChange={(e) => handleChange("fromAccount", e.target.value)}
            >
              <option value="">Select account</option>
              {user.accounts.map((acct, idx) => (
                <option key={idx} value={acct.account_number}>
                  {acct.account_number}
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Recipient Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.recipient}
              onChange={(e) => handleChange("recipient", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Recipient IBAN */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Recipient IBAN
            </label>
            <input
              type="text"
              placeholder="IT60X0542811101000000123456"
              value={form.recipientIban}
              onChange={(e) => handleChange("recipientIban", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Amount */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Amount (€)
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>
            <input
              type="text"
              placeholder="Optional"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition"
          >
            Send Money
          </button>
        </div>
      </motion.div>
    </div>
  );
}