import { Card } from "./../types/Card";

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  let id = 0;
  const symbols = ["♥", "♦", "♣", "♠"];
  for (let i = 1; i < 14; i++) {
    for (let j = 0; j < symbols.length; j++) {
      let rank: string | number;
      if (i === 1) {
        rank = "A";
      } else if (i === 11) {
        rank = "J";
      } else if (i === 12) {
        rank = "Q";
      } else if (i === 13) {
        rank = "K";
      } else {
        rank = i;
      }
      let number = i;
      if (i === 1) {
        number = 11;
      } else if (i > 10) {
        number = 10;
      }
      const card = {
        id,
        number,
        rank,
        symbol: symbols[j],
        isOpen: true,
      };
      deck.push(card);
      id++;
    }
  }
  return deck;
};
