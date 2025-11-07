import { useState } from "react";
import { motion } from "framer-motion";
import { type User } from "../../models/User";
import { createPortal } from "react-dom";

interface CreateAccountModalProps {
  user: User;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export default function CreateAccountModal({ user, onClose, onSubmit }: CreateAccountModalProps) {
  const [form, setForm] = useState({
    account_type: "checking",
    currency: "EUR",
    credit_limit: "",
    interest_rate: "",
    is_joint: false,
    branch_code: "",
    product_code: "",
    initial_deposit: "",
  });

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      user_id: user.userInfo.id,
      username: user.userInfo.username,
      credit_limit: form.credit_limit ? parseFloat(form.credit_limit) : undefined,
      interest_rate: form.interest_rate ? parseFloat(form.interest_rate) : undefined,
      initial_deposit: form.initial_deposit ? parseFloat(form.initial_deposit) : undefined,
    };

    console.log("Creating account with payload:", payload);
    if (onSubmit) onSubmit(payload);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
      >
        <div className="relative bg-white dark:bg-gray-800 p-6 space-y-5 rounded-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Create New Account
          </h2>

          {/* Account Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Account Type</label>
            <select
              value={form.account_type}
              onChange={(e) => handleChange("account_type", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          {/* Currency */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Currency</label>
            <input
              type="text"
              placeholder="EUR"
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Credit Limit */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Credit Limit (€)</label>
            <input
              type="number"
              placeholder="Optional"
              value={form.credit_limit}
              onChange={(e) => handleChange("credit_limit", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Interest Rate (%)</label>
            <input
              type="number"
              placeholder="Optional"
              value={form.interest_rate}
              onChange={(e) => handleChange("interest_rate", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Joint Account Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.is_joint}
              onChange={(e) => handleChange("is_joint", e.target.checked)}
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Joint Account</label>
          </div>

          {/* Branch & Product Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Branch Code</label>
              <input
                type="text"
                placeholder="BR001"
                value={form.branch_code}
                onChange={(e) => handleChange("branch_code", e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Product Code</label>
              <input
                type="text"
                placeholder="CHK01"
                value={form.product_code}
                onChange={(e) => handleChange("product_code", e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Initial Deposit */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Initial Deposit (€)</label>
            <input
              type="number"
              placeholder="Optional"
              value={form.initial_deposit}
              onChange={(e) => handleChange("initial_deposit", e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg transition"
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
