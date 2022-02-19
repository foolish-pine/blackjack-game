import colors from "colors";

import { Card, cardSymbols } from "./Card";
import { Deck } from "./Deck";
import { Participant } from "./Participant";

import { printLine } from "../utils/printLine";

export class Dealer extends Participant {
  private _isSecondCardOpen = false;

  constructor(deck: Deck) {
    super(deck);
  }

  get isSecondCardOpen() {
    return this._isSecondCardOpen;
  }

  set isSecondCardOpen(isSecondCardOpen: boolean) {
    this._isSecondCardOpen = isSecondCardOpen;
  }

  get hasAce() {
    return this.hand.filter((card) => card.rank === "A").length >= 1;
  }

  clearStatus() {
    this.hand = [];
    this.isSecondCardOpen = false;
  }

  renderSecondCard() {
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

  renderHand() {
    let renderedHand = colors.bold(`\nDealer: `);
    if (this.isSecondCardOpen) {
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
    } else {
      if (
        this.hand[0].symbol === cardSymbols.get("heart") ||
        this.hand[0].symbol === cardSymbols.get("diamond")
      ) {
        renderedHand += colors.red.bgWhite(
          ` ${this.hand[0].symbol} ${this.hand[0].rank} `
        );
      } else {
        renderedHand += colors.black.bgWhite(
          ` ${this.hand[0].symbol} ${this.hand[0].rank} `
        );
      }
      renderedHand += "  ";
      renderedHand += colors.black.bgWhite(" ??? ");
    }
    renderedHand += "\n";
    printLine(renderedHand);
  }

  renderNewCard() {
    super.renderNewCard(`\nDealer's new card: `);
  }
}
