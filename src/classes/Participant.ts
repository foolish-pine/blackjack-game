import { Card } from "./Card";
import { Deck } from "./Deck";

export class Participant {
  private _hand: Card[];

  constructor(private _deck: Deck) {
    this._hand = [];
  }

  get deck(): Deck {
    return this._deck;
  }

  set deck(deck: Deck) {
    this._deck = deck;
  }

  get hand(): Card[] {
    return this._hand;
  }

  set hand(cards: Card[]) {
    this._hand = cards;
  }

  get sum(): number {
    let sum = this.hand.reduce((sum, card) => sum + card.number, 0);
    let aceNum = this.hand.filter((card) => card.number === 1).length;
    while (sum <= 11 && aceNum >= 1) {
      aceNum--;
      sum += 10;
    }
    return sum;
  }

  get isBlackjack(): boolean {
    return this.sum === 21 && this.hand.length === 2;
  }

  get isBusted(): boolean {
    return this.sum > 21;
  }

  deal(): void {
    this.hand.push(this.deck.draw());
    this.hand.push(this.deck.draw());
  }

  hit(): void {
    this.hand.push(this.deck.draw());
  }
}
