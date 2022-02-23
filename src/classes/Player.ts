import colors from "colors";

import { cardSymbols } from "./Card";
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

  get money() {
    return this._money;
  }

  set money(money: number) {
    this._money = money;
  }

  get bet() {
    return this._bet;
  }

  set bet(bet: number) {
    this._bet = bet;
  }

  get hasHit() {
    return this._hasHit;
  }

  set hasHit(hasHit: boolean) {
    this._hasHit = hasHit;
  }

  get hasDoubleDowned() {
    return this._hasDoubleDowned;
  }

  set hasDoubleDowned(hasDoubleDowned: boolean) {
    this._hasDoubleDowned = hasDoubleDowned;
  }

  get isStanding() {
    return this._isStanding;
  }

  set isStanding(isStanding: boolean) {
    this._isStanding = isStanding;
  }

  clearStatus() {
    this.hand = [];
    this.bet = 0;
    this.hasHit = false;
    this.hasDoubleDowned = false;
    this.isStanding = false;
  }

  renderMoney() {
    printLine(
      `\n${colors.bold.yellow("Your money: ")}${colors.bold.yellow(
        `$${this.money}`
      )}`
    );
  }

  renderHand() {
    let renderedHand = colors.bold(`\nYou:    `);
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
      renderedHand += `  `;
    }
    renderedHand += `\n`;
    printLine(renderedHand);
  }

  renderNewCard() {
    super.renderNewCard(`\nYour new card: `);
  }

  hit() {
    this.hasHit = true;
    super.hit();
  }

  doubleDown() {
    this.hasDoubleDowned = true;
    this.money -= this.bet;
    this.bet *= 2;
    super.hit();
  }

  stand() {
    this.isStanding = true;
  }
}
