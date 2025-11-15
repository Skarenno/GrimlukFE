import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { type User } from "../../models/User";
import { createPortal } from "react-dom";
import type { AccountCreateRequest } from "../../api/account/requests";
import { createAccount, getAccountTypes } from "../../api/account/account-service";
import type { AccountType } from "../../api/account/responses";

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

  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      try {
        const types = await getAccountTypes();
        setAccountTypes(types);
      } catch (err) {
        console.error("Failed to fetch account types:", err);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchAccountTypes(); 
  }, [])

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    let newValue: string | boolean = value;

    if (key === "interest_rate") {
      const num = parseFloat(value as string);
      if (!isNaN(num)) {
        newValue = Math.min(5, Math.max(0, num)).toString();
      } else {
        newValue = "";
      }
      setForm(prev => ({ ...prev, [key]: newValue as string }));
      return
    }

    if (key === "initial_deposit") {
      const num = parseFloat(value as string);
      if (!isNaN(num)) {
        newValue = Math.min(250, Math.max(0, num)).toString();
      } else {
        newValue = "";
      }
      setForm(prev => ({ ...prev, [key]: newValue as string }));
      return
    }

    if (key == "account_type") {
      const accountTypeCode = accountTypes.find(type => type.name == value)?.code
      console.log(accountTypeCode)
      setForm((prev) => ({
        ...prev,
        [key]: value as string,
        product_code: accountTypeCode || "",
      }));
      return
    }

    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      user_id: user.userInfo.id,
      username: user.userInfo.username,
      credit_limit: form.credit_limit ? parseFloat(form.credit_limit) : undefined,
      interest_rate: form.interest_rate ? parseFloat(form.interest_rate) : undefined,
      initial_deposit: form.initial_deposit ? parseFloat(form.initial_deposit) : undefined,
    };



    const createRequest: AccountCreateRequest = {
      user_id: user.userInfo.id,
      username: user.userInfo.username,
      account_type: form.account_type,
      currency: form.currency,
      branch_code: form.branch_code,
      product_code: form.product_code,
      credit_limit: form.credit_limit ? parseFloat(form.credit_limit) : undefined,
      interest_rate: form.interest_rate ? parseFloat(form.interest_rate) : undefined,
      initial_deposit: form.initial_deposit ? parseFloat(form.initial_deposit) : undefined,
    }
    console.log("Creating account with payload:", payload);

    await createAccount(createRequest)
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait 2 seconds

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

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Account Type</label>
            <select
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
              onChange={(e) => handleChange("account_type", e.target.value)}
            >
              <option value="" disabled>Select account type</option>
              {loadingTypes ? (
                <option disabled>Loading...</option>
              ) : (
                accountTypes.map((type, idx) => (
                  <option key={idx} value={type.name}>
                    {type.name}
                  </option>
                ))
              )}
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

              min={0}
              max={5}
              step="0.01"
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
            />
          </div>

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
                className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                disabled />
            </div>
          </div>

          {/* Initial Deposit */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Initial Deposit (€)</label>
            <input
              type="number"
              placeholder="Optional"
              value={form.initial_deposit}
              onKeyDown={(e) => {
                if (["e", "E", "-", ",", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleChange("initial_deposit", e.target.value)}
              min={0}
              max={250}
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
