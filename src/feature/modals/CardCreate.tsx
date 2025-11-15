import { useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import type { Account } from "../../models/User";
import type { CardCreateRequest } from "../../api/account/requests";
import { createCard } from "../../api/account/card-service";

interface AddCardModalProps {
    account: Account;        // the account where the card will be linked
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export default function CreateCardModal({ account, onClose, onSubmit }: AddCardModalProps) {
    const [form, setForm] = useState<{
    cardholder_name: string;
    card_type: "debit" | "credit" | "prepaid";
    network: string;
    daily_limit: number;
    online_payments_enabled: boolean;
    contactless_enabled: boolean;
    }>({
    cardholder_name: "",
    card_type: "debit",
    network: "VIZA",
    daily_limit: 500,
    online_payments_enabled: true,
    contactless_enabled: true,
    });
    const [errors, setErrors] = useState<string[]>([]);


    const handleChange = (key: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const validateForm = () => {
        const errors: string[] = [];

        if (!form.cardholder_name.trim()) errors.push("Cardholder name is required.");
        if (!form.card_type) errors.push("Card type is required.");
        if (!form.network) errors.push("Network is required.");

        return errors;
    };
    const handleSubmit = async () => {
        const validationErrors = validateForm();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        const updateObj: CardCreateRequest = {
            daily_limit: form.daily_limit,
            online_payments_enabled: form.online_payments_enabled,
            user_id: account.user_id,
            account_id: account.id,
            cardholder_name:form.cardholder_name,
            card_type:form.card_type,
            network:form.network
        };

        try {
            console.log("Updating card with:", updateObj);
            await createCard(updateObj);
            onSubmit(updateObj);
            onClose();
        } catch (error) {
            console.error("Card update failed:", error);
        }
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
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4">Add New Card</h2>
                {errors.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                    {errors.map((e, i) => (
                    <p key={i}>• {e}</p>
                    ))}
                </div>
                )}
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

                <div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                        Network
                    </label>
                    <select
                        value={form.network}
                        onChange={(e) => handleChange("network", e.target.value)}
                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                    >
                        <option>VIZA</option>
                        <option>MAZTERCARDZ</option>
                    </select>
                </div>


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

                <div className="flex items-center justify-between mb-8  ">
                    <span className="text-gray-700 dark:text-gray-300">Online Payments</span>
                    <input
                        type="checkbox"
                        checked={form.online_payments_enabled}
                        onChange={(e) =>
                            handleChange("online_payments_enabled", e.target.checked)
                        }
                    />
                </div>

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
