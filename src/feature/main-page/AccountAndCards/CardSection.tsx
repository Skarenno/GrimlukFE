import type { Account, Card } from "../../../models/User";
import { DetailedCard } from "./DetailedCard";
import { DetailedCardBlocked } from "./DetailedBlockedCard";
import { CardStatus } from "../../utils/enums";

interface Props {
  cards: Card[];
  account: Account;
  isBlocked: boolean;
  onEditCard: (card: Card) => void;
  onCreateCard: (account: Account) => void;
}

export default function CardSection({
  cards,
  account,
  isBlocked,
  onEditCard,
  onCreateCard,
}: Props) {
  if (cards.length === 0) {
    return (
      <div className="mt-6">
        <p className="text-gray-500 italic pb-4">
          No cards linked to this account.
        </p>

        {!isBlocked && (
          <button
            onClick={() => onCreateCard(account)}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-xl 
              border-2 border-dashed border-green-500 dark:border-green-400 
              text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 
              transition"
          >
            <span className="text-xl font-bold">+</span> Add New Card
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-3">Linked Cards</h4>

      <div className="grid grid-cols-1 gap-4">
        {cards.map((card) =>
          card.status === CardStatus.Blocked ? (
            <DetailedCardBlocked key={card.id} card={card} />
          ) : (
            <DetailedCard
              key={card.id}
              card={card}
              onSettings={() => onEditCard(card)}
            />
          )
        )}

        {!isBlocked && (
          <button
            onClick={() => onCreateCard(account)}
            className="w-full mt-4 flex justify-center items-center gap-2 py-3 
              rounded-xl border-2 border-dashed border-green-500 dark:border-green-400 
              text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 
              transition"
          >
            <span className="text-xl font-bold">+</span> Add New Card
          </button>
        )}
      </div>
    </div>
  );
}
