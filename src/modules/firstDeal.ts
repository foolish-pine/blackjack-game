import { Card } from "../types/Card";

export const firstDeal = async (
  shuffledDeck: Card[],
  dealersHand: Card[],
  playersHand: Card[]
): Promise<{
  shuffledDeck: Card[];
  dealersHand: Card[];
  playersHand: Card[];
}> => {
  dealersHand.push(shuffledDeck.pop());
  dealersHand.push(shuffledDeck.pop());
  dealersHand[1].isOpen = false;
  playersHand.push(shuffledDeck.pop());
  playersHand.push(shuffledDeck.pop());
  return { shuffledDeck, dealersHand, playersHand };
};
