import { FaCog, FaCreditCard, FaEye, FaEyeSlash } from "react-icons/fa";
import type { Card } from "../../../models/User";
import { useState } from "react";

export function DetailedCard({ card, onSettings }: { card: Card; onSettings: () => void }) {
  const [showNumber, setShowNumber] = useState(false);

  // Format full card number: "1234567890123456" → "1234 5678 9012 3456"
  const formattedNumber = card.card_number.replace(/(.{4})/g, "$1 ").trim();

  return (
    <div
      className="relative bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl p-3 shadow-lg overflow-hidden group"
    >
      <div className="absolute top-3 right-5 flex items-center gap-3 z-10">
        <p className="text-sm opacity-80">{card.card_type.toUpperCase()}</p>
        <FaCreditCard size={22} className="opacity-80" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSettings();
          }}
          className="hover:opacity-100 transition text-white"
          title="Card Settings"
        >
          <FaCog />
        </button>
      </div>

      <div className="relative select-none">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="tracking-wider text-m opacity-80 font-mono"
            style={{ minWidth: "11.5rem" }}
          >
            {showNumber ? formattedNumber : `**** **** **** ${card.last4}`}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowNumber((prev) => !prev);
            }}
            className="text-white opacity-80 hover:opacity-100"
            title={showNumber ? "Hide card number" : "Show card number"}
          >
            {showNumber ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
          </button>
        </div>


        <div className="flex justify-between items-end">
          <div className="mt-3 text-[0.8rem] opacity-85 space-y-1">
            <p>
              <span className="uppercase opacity-75">Network:</span>{" "}
              <span className="font-semibold">{card.network}</span>
            </p>

            <p>
              <span className="uppercase opacity-75">Daily Limit:</span>{" "}
              <span className="font-semibold">${card.daily_limit}</span>
            </p>

            <p>
              <span className="uppercase opacity-75">Last Used:</span>{" "}
              <span className="font-semibold">
                {card.last_used_at ? new Date(card.last_used_at).toLocaleDateString() : "Never"}
              </span>
            </p>

          </div>
          <div>
            <p className="text-[0.8rem] uppercase opacity-75">Cardholder</p>
            <p className="font-semibold text-sm">{card.cardholder_name}</p>
          </div>

          <div className="text-right">
            <p className="text-[0.8rem] uppercase opacity-75">Expires</p>
            <p className="font-semibold text-sm">
              {String(card.expiry_month).padStart(2, "0")}/{card.expiry_year}
            </p>
          </div>


        </div>
      </div>
    </div>
  );
}
