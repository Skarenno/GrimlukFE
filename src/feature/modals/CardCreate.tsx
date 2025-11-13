import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import type { Account } from "../../models/User";

interface AddCardModalProps {
    account: Account;        // the account where the card will be linked
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function CreateCardModal({ account, onClose, onSubmit }: AddCardModalProps) {
    const [form, setForm] = useState({
        cardholder_name: "",
        card_type: "debit",
        network: "Visa",
        daily_limit: 500,
        contactless_enabled: true,
        online_payments_enabled: true,
    });

    const handleChange = (key: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const payload = {
            ...form,
            account_id: account.id,
        };

        onSubmit(payload);
        onClose();
    };


    const modal = (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4">Add New Card</h2>

                {/* Cardholder */}
                <div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        value={form.cardholder_name}
                        onChange={(e) => handleChange("cardholder_name", e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                        placeholder="John Doe"
                    />
                </div>

                {/* Card Type */}
                <div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                        Card Type
                    </label>
                    <select
                        value={form.card_type}
                        onChange={(e) => handleChange("card_type", e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    >
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
                        <option value="prepaid">Prepaid</option>
                    </select>
                </div>

                {/* Network */}
                <div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                        Network
                    </label>
                    <select
                        value={form.network}
                        onChange={(e) => handleChange("network", e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    >
                        <option>Visa</option>
                        <option>MasterCard</option>
                        <option>Amex</option>
                    </select>
                </div>

                {/* Daily Limit */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                        Daily Limit (€)
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={form.daily_limit}
                        onChange={(e) => handleChange("daily_limit", parseFloat(e.target.value))}
                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 dark:text-gray-300">Contactless</span>
                    <input
                        type="checkbox"
                        checked={form.contactless_enabled}
                        onChange={(e) =>
                            handleChange("contactless_enabled", e.target.checked)
                        }
                    />
                </div>

                <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-700 dark:text-gray-300">Online Payments</span>
                    <input
                        type="checkbox"
                        checked={form.online_payments_enabled}
                        onChange={(e) =>
                            handleChange("online_payments_enabled", e.target.checked)
                        }
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                >
                    Add Card
                </button>
            </motion.div>
        </div>
    );

    return createPortal(modal, document.body);

}
