import { FaCog, FaCreditCard, FaBan } from "react-icons/fa";
import type { Card } from "../../../models/User";

export function DetailedCardBlocked({
  card,

}: {
  card: Card;
}) {
  return (
    <div
      className="
        relative bg-gradient-to-r from-gray-700 to-gray-800 
        text-white rounded-xl p-3 shadow-lg overflow-hidden group 
        opacity-60 cursor-not-allowed select-none
      "
    >
      {/* BLOCKED badge */}
      <div
        className="
          absolute top-0 left-0 bg-red-600 text-white 
          px-3 py-1 text-xs font-bold 
          rounded-br-xl flex items-center gap-1 z-20
        "
      >
        <FaBan size={12} />
        BLOCKED
      </div>

      <div className="absolute top-3 right-5 flex items-center gap-3 z-10">
        <p className="text-sm opacity-70">{card.card_type.toUpperCase()}</p>
        <FaCreditCard size={22} className="opacity-70" />

        {/* settings still clickable */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="hover:opacity-100 opacity-70 transition text-white"
          title="Card Settings"
        >
          <FaCog />
        </button>
      </div>

      {/* DIMMED CONTENT */}
      <div className="relative p-3">
        <p className="tracking-wider text-sm opacity-60 mb-4">
          **** **** **** {card.last4}
        </p>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs uppercase opacity-60">Cardholder</p>
            <p className="font-semibold text-sm opacity-80">
              {card.cardholder_name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase opacity-60">Expires</p>
            <p className="font-semibold text-sm opacity-80">
              {String(card.expiry_month).padStart(2, "0")}/{card.expiry_year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
