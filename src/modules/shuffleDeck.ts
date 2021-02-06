import { Card } from "./../types/Card";

export const shuffleDeck = async (deck: Card[]): Promise<Card[]> => {
  const shuffledDeck: Card[] = [...deck];
  // デッキをシャッフルする;
  const cardNum = shuffledDeck.length;
  for (let i = cardNum - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[i],
    ];
  }
  return shuffledDeck;
};
