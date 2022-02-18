import colors from "colors";

import { Card, cardSymbols } from "./Card";
import { Deck } from "./Deck";

import { printLine } from "../utils/printLine";

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

  renderHand(prefix: string): void {
    let renderedHand = colors.bold(prefix);
    for (let i = 0; i < this.hand.length; i++) {
      if (
        this.hand[i].symbol === cardSymbols.get("heart") ||
        this.hand[i].symbol === cardSymbols.get("diamond")
      ) {
        renderedHand += colors.red.bgWhite(
          ` ${this.hand[i].symbol} ${this.hand[i].rank} `
        );
      } else {
        renderedHand += colors.black.bgWhite(
          ` ${this.hand[i].symbol} ${this.hand[i].rank} `
        );
      }
      renderedHand += "  ";
    }
    renderedHand += "\n";
    printLine(renderedHand);
  }

  renderNewCard(prefix: string): void {
    let renderedCard = colors.bold(prefix);
    if (
      this.hand[this.hand.length - 1].symbol === cardSymbols.get("heart") ||
      this.hand[this.hand.length - 1].symbol === cardSymbols.get("diamond")
    ) {
      renderedCard += colors.red.bgWhite(
        ` ${this.hand[this.hand.length - 1].symbol} ${
          this.hand[this.hand.length - 1].rank
        } `
      );
    } else {
      renderedCard += colors.black.bgWhite(
        ` ${this.hand[this.hand.length - 1].symbol} ${
          this.hand[this.hand.length - 1].rank
        } `
      );
    }
    renderedCard += "\n";
    printLine(renderedCard);
  }
}
