import colors from "colors";

import { Deck } from "./Deck";
import { Participant } from "./Participant";

import { printLine } from "../utils/printLine";

export class Player extends Participant {
  private _money = 1000;
  private _bet = 0;
  private _hasHit = false;
  private _hasDoubleDowned = false;
  private _isStanding = false;

  constructor(deck: Deck) {
    super(deck);
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
    super.renderHand(`\nYou:    `);
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
