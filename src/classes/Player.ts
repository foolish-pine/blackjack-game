import * as colors from "colors";

import { Deck } from "./Deck";
import { Participant } from "./Participant";

import { printLine } from "../utils/printLine";

export class Player extends Participant {
  private _money: number;
  private _bet: number;
  private _hasHit: boolean;
  private _hasDoubleDowned: boolean;
  private _isStanding: boolean;

  constructor(deck: Deck) {
    super(deck);
    this._money = 1000;
    this._bet = 0;
    this._hasHit = false;
    this._hasDoubleDowned = false;
    this._isStanding = false;
  }

  get money(): number {
    return this._money;
  }

  set money(money: number) {
    this._money = money;
  }

  get bet(): number {
    return this._bet;
  }

  set bet(bet: number) {
    this._bet = bet;
  }

  get hasHit(): boolean {
    return this._hasHit;
  }

  set hasHit(hasHit: boolean) {
    this._hasHit = hasHit;
  }

  get hasDoubleDowned(): boolean {
    return this._hasDoubleDowned;
  }

  set hasDoubleDowned(hasDoubleDowned: boolean) {
    this._hasDoubleDowned = hasDoubleDowned;
  }

  get isStanding(): boolean {
    return this._isStanding;
  }

  set isStanding(isStanding: boolean) {
    this._isStanding = isStanding;
  }

  clearStatus(): void {
    this.hand = [];
    this.bet = 0;
    this.hasHit = false;
    this.hasDoubleDowned = false;
    this.isStanding = false;
  }

  renderMoney(): void {
    printLine(
      `\n${colors.bold.yellow("Your money: ")}${colors.bold.yellow(
        `$${this.money}`
      )}`
    );
  }

  renderHand(): void {
    let renderedHand = colors.bold(`\nYou:    `);
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
    renderedHand += "\n";
    printLine(renderedHand);
  }

  renderNewCard(): void {
    let renderedCard = colors.bold("\nYour new card: ");
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
    printLine(renderedCard);
  }

  hit(): void {
    this.hasHit = true;
    this.hand.push(this.deck.draw());
  }

  doubleDown(): void {
    this.hasDoubleDowned = true;
    this.money -= this.bet;
    this.bet *= 2;
    this.hand.push(this.deck.draw());
  }

  stand(): void {
    this.isStanding = true;
  }
}
