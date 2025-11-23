import type { Account, Card } from "../../../models/User";
import { CardStatus } from "../../utils/enums";

interface CardListProps {
  cards: Card[];
  accounts: Account[]
}

export function CardList({ cards, accounts }: CardListProps) {

  const activeCards = cards.filter(card => card.status == CardStatus.Active)
  if (cards.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Your Active Cards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeCards.map((card, idx) => (
          <div
            key={idx}
            className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {card.card_type.toUpperCase() + " CARD" || "CARD"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-200 pt-1">
                Account {accounts.filter(acc => acc.id == card.account_id).at(0)?.account_number}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                **** **** **** {card.last4}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expires: {card.expiry_year + "/" + card.expiry_month || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
