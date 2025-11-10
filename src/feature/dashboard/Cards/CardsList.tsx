import type { Card } from "../../../models/User";

interface CardListProps {
  cards: Card[];
}

export function CardList({ cards }: CardListProps) {
  if (cards.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Your Cards</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {card.name || "Card"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                **** **** **** {card.last4}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expires: {card.expiry || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
