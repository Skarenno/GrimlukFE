import type { Card } from "../../models/User";


export default function groupCards(cards: Card[] = []) {
  return cards.reduce((acc, card) => {
    acc[card.account_id] ||= [];
    acc[card.account_id].push(card);
    return acc;
  }, {} as Record<number, Card[]>);
}
