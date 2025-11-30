import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Card } from "../../models/User";
import { updateCard } from "../../api/account/card-service";
import type { CardUpdateRequest } from "../../api/account/requests";
import { CardStatus, type CardStatusType } from "../utils/enums";

interface CardSettingsModalProps {
    card: Card;
    onClose: () => void;
    onSave: (updated: Partial<Card>) => void;
}

export default function CardSettingsModal({ card, onClose, onSave }: CardSettingsModalProps) {
    const [form, setForm] = useState({
        daily_limit: card.daily_limit,
        online_payments_enabled: card.online_payments_enabled,
        status: card.status,
    });

    const handleChange = (key: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };


    const handleSubmit = async () => {
        const updateObj: CardUpdateRequest = {
            daily_limit: form.daily_limit,
            online_payments_enabled: form.online_payments_enabled,
            status: form.status,
        };

        try {
            console.log("Updating card with:", updateObj);
            await updateCard(card.id, updateObj);
            onSave(updateObj);
            onClose();
        } catch (error) {
            console.error("Card update failed:", error);
        }
    };

    const handleBlock = async (  status: CardStatusType) =>{
        const updateObj: CardUpdateRequest = {
            status: status
        };

        try {
            console.log("BLOCKING CARD");
            await updateCard(card.id, updateObj);
            onSave(updateObj);
            onClose();
        } catch (error) {
            console.error("Card update failed:", error);
        }
    }

    const modal = (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-md dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Card Settings
                </h2>



                <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Online Payments
                    </label>
                    <input
                        type="checkbox"
                        checked={form.online_payments_enabled}
                        onChange={(e) => handleChange("online_payments_enabled", e.target.checked)}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                </div>

                <div className="py-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-1">
                        Daily Limit (€)
                    </label>
                    <input
                        type="number"
                        value={form.daily_limit}
                        onChange={(e) => handleChange("daily_limit", parseFloat(e.target.value) || 0)}
                        min={0}
                        max={10000}
                        className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 
                       dark:border-gray-600 text-gray-800 dark:text-gray-100"
                    />
                </div>


                <div className="flex justify-between items-center mt-6">

                    <button
                        onClick={() => {
                            handleChange("status", CardStatus.Blocked);
                            handleBlock("blocked");
                        }}
                        className="px-4 py-2 rounded-lg  hover:bg-red-700 text-white font-semibold transition bg-red-600 dark:bg-red-700" 
                    >
                        Block Card
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 
            text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

            </motion.div>
        </div>
    );

    return createPortal(modal, document.body);
}
