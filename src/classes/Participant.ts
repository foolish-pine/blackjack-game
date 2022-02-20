import colors from "colors";

import { Card, cardSymbols } from "./Card";
import { Deck } from "./Deck";

import { printLine } from "../utils/printLine";

export class Participant {
  private _deck: Deck;
  private _hand: Card[] = [];

  constructor(deck: Deck) {
    this._deck = deck;
  }

  get deck() {
    return this._deck;
  }

  set deck(deck) {
    this._deck = deck;
  }

  get hand() {
    return this._hand;
  }

  set hand(cards) {
    this._hand = cards;
  }

  get sum() {
    let sum = this.hand.reduce((sum, card) => sum + card.number, 0);
    let aceNum = this.hand.filter((card) => card.number === 1).length;
    while (sum <= 11 && aceNum >= 1) {
      aceNum--;
      sum += 10;
    }
    return sum;
  }

  get isBlackjack() {
    return this.sum === 21 && this.hand.length === 2;
  }

  get isBusted() {
    return this.sum > 21;
  }

  deal() {
    this.hand.push(this.deck.draw());
    this.hand.push(this.deck.draw());
  }

  hit() {
    this.hand.push(this.deck.draw());
  }

  renderNewCard(prefix: string) {
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
    renderedCard += `\n`;
    printLine(renderedCard);
  }
}
