import * as figlet from "figlet";
const colors = require("colors");

import { Card } from "./Card";
import { Deck } from "./Deck";
import { Dealer } from "./Dealer";
import { Player } from "./Player";

import { printLine } from "../utils/printLine";
import { promptInput } from "../utils/promptInput";
import { promptSelect } from "../utils/promptSelect";

const playerActions = ["h", "d", "s"] as const;
type playerAction = typeof playerActions[number];

export class Game {
  private deck: Deck;
  private dealer: Dealer;
  private player: Player;

  constructor() {
    this.deck = new Deck();
    this.dealer = new Dealer(this.deck);
    this.player = new Player(this.deck);
  }

  private async renderTitle(): Promise<void> {
    // タイトルのアスキーアートを表示する
    printLine(
      `${colors.rainbow(
        figlet.textSync("BLACK JACK", {
          font: "Big Chief",
          horizontalLayout: "default",
          verticalLayout: "default",
        })
      )}`
    );
  }

  private validateBet(inputBet: string): boolean {
    if (
      isNaN(Number(inputBet)) ||
      !Number.isInteger(Number(inputBet)) ||
      Number(inputBet) <= 0
    ) {
      printLine("\nPlease input a positive integer.");
      return false;
    } else if (Number(inputBet) > this.player.money) {
      printLine("\nPlease bet an amount of money you can.");
      return false;
    } else {
      return true;
    }
  }

  private checkResult(): void {
    if (this.dealer.isBusted) {
      this.player.money += 2 * this.player.bet;
      printLine(`\n${colors.bold.red("Dealer Busted")}`);
      printLine(`\n${colors.bold.red("You Win!!")}`);
      printLine(
        "\n" +
          colors.bold.red("You won ") +
          colors.bold.red(`$${this.player.bet}`)
      );
    } else if (this.player.isBusted) {
      printLine(`\n${colors.bold.blue("You Busted")}`);
      printLine(`\n${colors.bold.blue("You Lose")}`);
      printLine(
        "\n" +
          colors.bold.blue("You lost ") +
          colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (this.dealer.sum === 21 && this.player.sum === 21) {
      if (
        (this.dealer.isBlackjack && this.player.isBlackjack) ||
        (!this.dealer.isBlackjack && !this.player.isBlackjack)
      ) {
        this.player.money += this.player.bet;
        printLine(`\n${colors.bold("Draw")}`);
      } else if (this.dealer.isBlackjack && !this.player.isBlackjack) {
        printLine(`\n${colors.bold.blue("You Lose")}`);
        printLine(
          "\n" +
            colors.bold.blue("You lost ") +
            colors.bold.blue(`$${this.player.bet}`)
        );
      } else {
        this.player.money += Math.floor(2.5 * this.player.bet);
        printLine(`\n${colors.rainbow("B L A C K J A C K")}`);
        printLine(`\n${colors.bold.red("You Win!!")}`);
        printLine(
          "\n" +
            colors.bold.red("You won ") +
            colors.bold.red(`$${1.5 * this.player.bet}`)
        );
      }
    } else if (this.player.isBlackjack) {
      this.player.money += Math.floor(2.5 * this.player.bet);
      printLine(`\n${colors.rainbow("B L A C K J A C K")}`);
      printLine(`\n${colors.bold.red("You Win!!")}`);
      printLine(
        "\n" +
          colors.bold.red("You won ") +
          colors.bold.red(`$${1.5 * this.player.bet}`)
      );
    } else if (this.dealer.sum > this.player.sum) {
      printLine(`\n${colors.bold.blue("You Lose")}`);
      printLine(
        "\n" +
          colors.bold.blue("You lost ") +
          colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (this.dealer.sum < this.player.sum) {
      this.player.money += 2 * this.player.bet;
      printLine(`\n${colors.bold.red("You Win!!")}`);
      printLine(
        "\n" +
          colors.bold.red("You won ") +
          colors.bold.red(`$${this.player.bet}`)
      );
    } else {
      this.player.money += this.player.bet;
      printLine(`\n${colors.bold("Draw")}`);
    }
    this.player.renderMoney();
  }

  private reset(): void {
    this.deck = new Deck();
    this.dealer.deck = this.deck;
    this.dealer.clearStatus();
    this.player.deck = this.deck;
    this.player.clearStatus();
  }

  private async play(): Promise<void> {
    // 山札とディーラー、プレイヤーのステータスをリセットする
    this.reset();

    // プレイヤーの所持金を表示する
    this.player.renderMoney();

    // 賭け金を入力するプロンプトを表示する
    printLine(`\n${colors.bold("Set Your Bet.")}`);
    let inputBet = await promptInput(`\n> $`);

    // 入力値をバリデーションする。バリデーションをパスしなかった場合、もう一度入力を促す
    while (!this.validateBet(inputBet)) {
      printLine(`\n${colors.bold("Set Your Bet.")}`);
      inputBet = await promptInput(`\n> $`);
    }
    this.player.bet = Number(inputBet);
    this.player.money -= this.player.bet;
    printLine(colors.bold.yellow(`\nYour bet: $${this.player.bet}`));
    await promptInput(colors.bold("\n(Enter)"));

    // ディーラーとプレイヤーにカードを配り、ゲームを開始する
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
      // プレイヤーのアクションを入力するプロンプトを表示する
      let inputAction = await promptSelect<playerAction>(
        this.player.hasHit
          ? `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
              "Hit[h]"
            )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`
          : `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
              "Hit[h]"
            )} ${colors.bold("/")} ${colors.bold.cyan(
              "DoubleDown[d]"
            )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`,
        playerActions
      );

      if (inputAction === "h") {
        this.player.hit();
        printLine(colors.bold.green("\nYou hit."));
        await promptInput(colors.bold("\n(Enter)"));
        this.player.renderNewCard();
      } else if (inputAction === "d" && !this.player.hasHit) {
        if (this.player.money - this.player.bet < 0) {
          printLine(
            colors.bold("You can't double down. You don't have enough money.")
          );
        }
        this.player.doubleDown();
        printLine(colors.bold.cyan("\nYou doubled down."));
        await promptInput(colors.bold("\n(Enter)"));
        this.player.renderNewCard();
      } else if (inputAction === "s") {
        this.player.stand();
        printLine(colors.bold.yellow("\nYou stand."));
        await promptInput(colors.bold("\n(Enter)"));
      }
      this.dealer.renderHand();
      this.player.renderHand();
      await promptInput(colors.bold("\n(Enter)"));
    }

    if (this.player.isBusted) {
      this.checkResult();
      return;
    }

    this.dealer.renderSecondCard();
    this.dealer.renderHand();
    this.player.renderHand();
    await promptInput(colors.bold("\n(Enter)"));

    while (
      (this.dealer.sum === 17 &&
        this.dealer.hand.filter((card: Card) => card.rank === "A").length >=
          1) ||
      this.dealer.sum < 17
    ) {
      // ディーラーの手札の合計が17かつ手札にエースが含まれるとき、または17未満のとき、条件を満たさなくなるまで以下を繰り返す
      this.dealer.hit();
      this.dealer.renderNewCard();
      this.dealer.renderHand();
      this.player.renderHand();
      await promptInput(colors.bold("\n(Enter)"));
    }

    this.checkResult();
  }

  async start(): Promise<void> {
    await this.renderTitle();
    while (this.player.money > 0) {
      await this.play();
      if (this.player.money > 0) {
        printLine(colors.bold("\nPlease Enter to start next game"));
        await promptInput(colors.bold("\n(Enter)"));
      }
    }
    printLine(colors.bold("\nGame Over!!"));
    process.exit();
  }
}
