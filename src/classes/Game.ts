import * as figlet from "figlet";
import * as readlineSync from "readline-sync";
import * as colors from "colors";

import { Card } from "./Card";
import { Deck } from "./Deck";
import { Dealer } from "./Dealer";
import { Player } from "./Player";

export class Game {
  private deck: Deck;
  private dealer: Dealer;
  private player: Player;

  constructor() {
    this.deck = new Deck();
    this.dealer = new Dealer(this.deck);
    this.player = new Player(this.deck);
  }

  async renderTitle(): Promise<void> {
    // タイトルのアスキーアートを表示する
    console.log(
      colors.rainbow(
        figlet.textSync("BLACK JACK", {
          font: "Big Chief",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )
    );
    readlineSync.question(colors.bold("Please Enter to Start"));
    console.log("");
  }

  async inputBet(): Promise<void> {
    try {
      this.player.renderMoney();
      const input: string = readlineSync.question(
        `${colors.bold("Set Your Bet: ")}$`
      );
      this.player.setBet(input);
      console.log(colors.bold.yellow(`\nYour bet: $${this.player.bet}`));
      readlineSync.question(colors.bold("(Enter)"));
      console.log("");
    } catch (e) {
      console.log(e.message);
    }
  }

  async actByPlayer(): Promise<void> {
    const action = await this.player.selectAction();
    try {
      if (action === "h") {
        this.player.hit();
        this.player.hasHit = true;
        readlineSync.question(
          colors.bold.green("You hit.") + colors.bold("\n(Enter)")
        );
        console.log("");
        this.player.renderNewCard();
      } else if (action === "d" && !this.player.hasHit) {
        if (this.player.money - this.player.bet < 0) {
          throw new Error(
            colors.bold("You can't double down. You don't have enough money.")
          );
        }
        this.player.doubleDown();
        readlineSync.question(
          colors.bold.cyan("You doubled down.") + colors.bold("\n(Enter)")
        );
        console.log("");
        this.player.renderNewCard();
      } else if (action === "s") {
        this.player.isStanding = true;
        readlineSync.question(
          colors.bold.yellow("You stand.") + colors.bold("\n(Enter)")
        );
        console.log("");
      } else {
        throw new Error("\nPlease input Hit[h] or DoubleDown[d] or Stand[s]");
      }
      this.dealer.renderHand();
      this.player.renderHand();
      readlineSync.question(colors.bold("(Enter)"));
      console.log("");
    } catch (e) {
      console.log(e.message);
    }
  }

  checkResult(): void {
    if (this.dealer.isBusted) {
      this.player.money += 2 * this.player.bet;
      console.log(colors.bold.red("Dealer Busted"));
      console.log(colors.bold.red("You Win!!"));
      console.log(
        colors.bold.red("You won ") + colors.bold.red(`$${this.player.bet}`)
      );
    } else if (this.player.isBusted) {
      console.log(colors.bold.blue("You Busted"));
      console.log(colors.bold.blue("You Lose"));
      console.log(
        colors.bold.blue("You lost ") + colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (this.dealer.sum === 21 && this.player.sum === 21) {
      if (
        (this.dealer.isBlackjack && this.player.isBlackjack) ||
        (!this.dealer.isBlackjack && !this.player.isBlackjack)
      ) {
        this.player.money += this.player.bet;
        console.log(colors.bold("Draw"));
      } else if (this.dealer.isBlackjack && !this.player.isBlackjack) {
        console.log(colors.bold.blue("You Lose"));
        console.log(
          colors.bold.blue("You lost ") +
            colors.bold.blue(`$${this.player.bet}`)
        );
      } else {
        this.player.money += Math.floor(2.5 * this.player.bet);
        console.log(colors.rainbow("B L A C K J A C K"));
        console.log(colors.bold.red("You Win!!"));
        console.log(
          colors.bold.red("You won ") +
            colors.bold.red(`$${1.5 * this.player.bet}`)
        );
      }
    } else if (this.player.isBlackjack) {
      this.player.money += Math.floor(2.5 * this.player.bet);
      console.log(colors.rainbow("B L A C K J A C K"));
      console.log(colors.bold.red("You Win!!"));
      console.log(
        colors.bold.red("You won ") +
          colors.bold.red(`$${1.5 * this.player.bet}`)
      );
    } else if (this.dealer.sum > this.player.sum) {
      console.log(colors.bold.blue("You Lose"));
      console.log(
        colors.bold.blue("You lost ") + colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (this.dealer.sum < this.player.sum) {
      this.player.money += 2 * this.player.bet;
      console.log(colors.bold.red("You Win!!"));
      console.log(
        colors.bold.red("You won ") + colors.bold.red(`$${this.player.bet}`)
      );
    } else {
      this.player.money += this.player.bet;
      console.log(colors.bold("Draw"));
    }
    console.log("");
    this.player.renderMoney();
    console.log("");
  }

  async start(): Promise<void> {
    await this.renderTitle();

    while (this.player.money > 0) {
      this.deck.shuffle();
      this.dealer.deck = this.deck;
      this.player.deck = this.deck;
      this.dealer.clear();
      this.player.clear();

      while (this.player.bet === 0) {
        await this.inputBet();
      }

      this.dealer.deal();
      this.player.deal();
      this.dealer.renderHand();
      this.player.renderHand();

      while (
        !this.player.isBlackjack &&
        !this.player.isBusted &&
        !this.player.isStanding &&
        !this.player.hasDoubleDowned &&
        this.player.sum < 21
      ) {
        await this.actByPlayer();
      }

      if (!this.player.isBusted) {
        this.dealer.renderSecondCard();
        this.dealer.renderHand();
        this.player.renderHand();
        readlineSync.question(colors.bold("(Enter)"));
        console.log("");
      }

      while (
        ((this.dealer.sum === 17 &&
          this.dealer.hand.filter((card: Card) => card.rank === "A").length >=
            1) ||
          this.dealer.sum < 17) &&
        !this.player.isBusted
      ) {
        // ディーラーの手札の合計が17かつ手札にエースが含まれるとき、または17未満のとき、条件を満たさなくなるまで以下を繰り返す
        this.dealer.hit();
        this.dealer.renderNewCard();
        this.dealer.renderHand();
        this.player.renderHand();
        readlineSync.question(colors.bold("(Enter)"));
        console.log("");
      }
      this.checkResult();
      if (this.player.money > 0) {
        console.log(colors.bold("Please Enter to start next game"));
        readlineSync.question(colors.bold("(Enter)"));
        console.log("");
      } else {
        console.log(colors.bold("Game Over!!"));
      }
    }
  }
}
