import { cardSymbols, cardNumberAndRanks } from "./Card";
import { Card } from "./Card";

export class Deck {
  private _cards: Card[];

  constructor() {
    this._cards = [];
    cardSymbols.forEach((cardSymbol) => {
      cardNumberAndRanks.forEach((cardNumberAndRank) => {
        this._cards.push(
          new Card(cardSymbol, cardNumberAndRank.number, cardNumberAndRank.rank)
        );
      });
    });

    this.shuffle();
  }

  get cards(): Card[] {
    return this._cards;
  }

  shuffle(): void {
    const cardNum = this.cards.length;
    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[i],
      ];
    }
  }

  draw(): Card {
    return this.cards.pop() as Card;
  }
}
