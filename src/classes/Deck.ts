import { Card } from "./Card";

export class Deck {
  private _cards: Card[];

  constructor() {
    this._cards = [];
    const symbols = [
      String.fromCodePoint(0x2660),
      String.fromCodePoint(0x2665),
      String.fromCodePoint(0x2666),
      String.fromCodePoint(0x2663),
    ];
    for (let i = 0; i < symbols.length; i++) {
      for (let j = 1; j <= 13; j++) {
        let number = j;
        if (j > 10) {
          number = 10;
        }
        let rank: string;
        if (j === 1) {
          rank = "A";
        } else if (j === 11) {
          rank = "J";
        } else if (j === 12) {
          rank = "Q";
        } else if (j === 13) {
          rank = "K";
        } else {
          rank = `${j}`;
        }
        this._cards.push(new Card(symbols[i], number, rank));
      }
    }
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
