const colors = require("colors");

import { Deck } from "./Deck";
import { Participant } from "./Participant";

import { printLine } from "../utils/printLine";

export class Dealer extends Participant {
  private _isSecondCardOpen: boolean;

  constructor(deck: Deck) {
    super(deck);
    this._isSecondCardOpen = false;
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

    let renderedCard = colors.bold("\nDealer's second card: ");
    if (
      this.hand[1].symbol === String.fromCodePoint(0x2665) ||
      this.hand[1].symbol === String.fromCodePoint(0x2666)
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
    let renderedHand = colors.bold(`\nDealer: `);
    if (this.isSecondCardOpen) {
      for (let i = 0; i < this.hand.length; i++) {
        if (
          this.hand[i].symbol === String.fromCodePoint(0x2665) ||
          this.hand[i].symbol === String.fromCodePoint(0x2666)
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
        this.hand[0].symbol === String.fromCodePoint(0x2665) ||
        this.hand[0].symbol === String.fromCodePoint(0x2666)
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

  renderNewCard(): void {
    let renderedCard = colors.bold("\nDealer's new card: ");
    if (
      this.hand[this.hand.length - 1].symbol === String.fromCodePoint(0x2665) ||
      this.hand[this.hand.length - 1].symbol === String.fromCodePoint(0x2666)
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
    console.log(renderedCard);
  }
}
