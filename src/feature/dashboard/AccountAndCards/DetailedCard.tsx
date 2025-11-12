import { FaCog, FaCreditCard } from "react-icons/fa";
import type { Card } from "../../../models/User";

export function DetailedCard({ card, onSettings }: { card: Card; onSettings: () => void }) {
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
            e.stopPropagation(); // prevents click bubbling
            onSettings();
          }}
          className="hover:opacity-100 transition text-white"
          title="Card Settings"
        >
          <FaCog />
        </button>
      </div>

      <div className="relative p-3 select-none">
        <p className="tracking-wider text-sm opacity-80 mb-4">
          **** **** **** {card.last4}
        </p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs uppercase opacity-75">Cardholder</p>
            <p className="font-semibold text-sm">{card.cardholder_name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase opacity-75">Expires</p>
            <p className="font-semibold text-sm">
              {String(card.expiry_month).padStart(2, "0")}/{card.expiry_year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}