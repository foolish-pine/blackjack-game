import { cardSymbols, cardNumberAndRanks } from "./Card";
import { Card } from "./Card";

export class Deck {
  private _cards: Card[] = [];

  constructor() {
    cardSymbols.forEach((cardSymbol) => {
      cardNumberAndRanks.forEach((cardNumberAndRank) => {
        this._cards.push(
          new Card(cardSymbol, cardNumberAndRank.number, cardNumberAndRank.rank)
        );
      });
    });

    this.shuffle();
  }

  get cards() {
    return this._cards;
  }

  shuffle() {
    const cardNum = this.cards.length;
    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[i],
      ];
    }
  }

  draw() {
    return this.cards.pop() as Card;
  }
}
