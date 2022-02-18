import colors from "colors";

import { cardSymbols } from "./Card";
import { Deck } from "./Deck";
import { Participant } from "./Participant";

import { printLine } from "../utils/printLine";

export class Dealer extends Participant {
  private _isSecondCardOpen = false;

  constructor(deck: Deck) {
    super(deck);
  }

  get isSecondCardOpen(): boolean {
    return this._isSecondCardOpen;
  }

  set isSecondCardOpen(isSecondCardOpen: boolean) {
    this._isSecondCardOpen = isSecondCardOpen;
  }

  clearStatus(): void {
    this.hand = [];
    this.isSecondCardOpen = false;
  }

  renderSecondCard(): void {
    this.isSecondCardOpen = true;

    let renderedCard = colors.bold(`\nDealer's second card: `);
    if (
      this.hand[1].symbol === cardSymbols.get("heart") ||
      this.hand[1].symbol === cardSymbols.get("diamond")
    ) {
      renderedCard += colors.red.bgWhite(
        ` ${this.hand[1].symbol} ${this.hand[1].rank} `
      );
    } else {
      renderedCard += colors.black.bgWhite(
        ` ${this.hand[1].symbol} ${this.hand[1].rank} `
      );
    }
    renderedCard += "\n";
    printLine(renderedCard);
  }

  renderHand(): void {
    super.renderHand(`\nDealer:    `);
  }

  renderNewCard(): void {
    super.renderNewCard(`\nDealer's new card: `);
  }
}
