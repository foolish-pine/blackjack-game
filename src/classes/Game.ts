import figlet from "figlet";
import colors from "colors";

import { Deck } from "./Deck";
import { Dealer } from "./Dealer";
import { Player } from "./Player";

import { printLine } from "../utils/printLine";
import { promptInput } from "../utils/promptInput";
import { promptSelect } from "../utils/promptSelect";

export const playerActions = ["h", "d", "s"] as const;
export const playerActionsExceptDoubleDown = ["h", "s"] as const;
type playerAction = typeof playerActions[number];
type playerActionExceptDoubleDown =
  typeof playerActionsExceptDoubleDown[number];

export class Game {
  private deck = new Deck();
  private dealer = new Dealer(this.deck);
  private player = new Player(this.deck);

  private async renderTitle() {
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

  private reset() {
    this.deck = new Deck();
    this.dealer.deck = this.deck;
    this.dealer.clearStatus();
    this.player.deck = this.deck;
    this.player.clearStatus();
  }

  private deal() {
    this.dealer.deal();
    this.player.deal();
    this.dealer.renderHand();
    this.player.renderHand();
  }

  private validateBet(inputBet: string) {
    if (
      isNaN(Number(inputBet)) ||
      !Number.isInteger(Number(inputBet)) ||
      Number(inputBet) <= 0
    ) {
      printLine(`\nPlease input a positive integer.`);
      return false;
    } else if (Number(inputBet) > this.player.money) {
      printLine(`\nPlease bet an amount of money you can.`);
      return false;
    } else {
      return true;
    }
  }

  private async promptInputBet() {
    printLine(`\n${colors.bold("Set Your Bet.")}`);
    return await promptInput(`\n> $`);
  }

  private async setBet() {
    // 賭け金を入力するプロンプトを表示する
    let inputBet = await this.promptInputBet();

    // 入力値をバリデーションする。バリデーションをパスしなかった場合、もう一度入力を促す
    while (!this.validateBet(inputBet)) {
      inputBet = await this.promptInputBet();
    }
    this.player.bet = Number(inputBet);
    this.player.money -= this.player.bet;
    printLine(colors.bold.yellow(`\nYour bet: $${this.player.bet}`));
    await promptInput(colors.bold(`\n(Enter)`));
  }

  private get isPlayerOnAction() {
    return (
      !this.player.isBlackjack &&
      !this.player.isBusted &&
      !this.player.isStanding &&
      !this.player.hasDoubleDowned &&
      this.player.sum < 21
    );
  }

  private async promptInputAction() {
    return this.player.hasHit || this.player.money - this.player.bet < 0
      ? await promptSelect<playerActionExceptDoubleDown>(
          `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
            "Hit[h]"
          )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`,
          playerActionsExceptDoubleDown
        )
      : await promptSelect<playerAction>(
          `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
            "Hit[h]"
          )} ${colors.bold("/")} ${colors.bold.cyan(
            "DoubleDown[d]"
          )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`,
          playerActions
        );
  }

  private async doPlayerAction(inputAction: playerAction) {
    if (inputAction === "h") {
      this.player.hit();
      printLine(colors.bold.green(`\nYou hit.`));
      await promptInput(colors.bold(`\n(Enter)`));
      this.player.renderNewCard();
    } else if (inputAction === "d") {
      this.player.doubleDown();
      printLine(colors.bold.cyan(`\nYou doubled down.`));
      await promptInput(colors.bold(`\n(Enter)`));
      this.player.renderNewCard();
    } else if (inputAction === "s") {
      this.player.stand();
      printLine(colors.bold.yellow(`\nYou stand.`));
      await promptInput(colors.bold(`\n(Enter)`));
    }
    this.dealer.renderHand();
    this.player.renderHand();
    await promptInput(colors.bold(`\n(Enter)`));
  }

  private get isDealerOnAction() {
    return (
      (this.dealer.sum === 17 && this.dealer.hasAce) || this.dealer.sum < 17
    );
  }

  private async doDealerAction() {
    this.dealer.hit();
    this.dealer.renderNewCard();
    this.dealer.renderHand();
    this.player.renderHand();
    await promptInput(colors.bold(`\n(Enter)`));
  }

  private async revealDealersSecondCard() {
    this.dealer.renderSecondCard();
    this.dealer.renderHand();
    this.player.renderHand();
    await promptInput(colors.bold("\n(Enter)"));
  }

  private checkResult() {
    if (this.dealer.isBusted) {
      this.player.money += 2 * this.player.bet;
      printLine(`\n${colors.bold.red("Dealer Busted")}`);
      printLine(`\n${colors.bold.red("You Win!!")}`);
      printLine(
        `\n` +
          colors.bold.red(`You won `) +
          colors.bold.red(`$${this.player.bet}`)
      );
    } else if (this.player.isBusted) {
      printLine(`\n${colors.bold.blue("You Busted")}`);
      printLine(`\n${colors.bold.blue("You Lose")}`);
      printLine(
        `\n` +
          colors.bold.blue(`You lost `) +
          colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (this.dealer.isBlackjack && this.player.isBlackjack) {
      this.player.money += this.player.bet;
      printLine(`\n${colors.bold("Draw")}`);
    } else if (this.dealer.isBlackjack && !this.player.isBlackjack) {
      printLine(`\n${colors.bold.blue("You Lose")}`);
      printLine(
        `\n` +
          colors.bold.blue(`You lost `) +
          colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (!this.dealer.isBlackjack && this.player.isBlackjack) {
      this.player.money += Math.floor(2.5 * this.player.bet);
      printLine(`\n${colors.rainbow("B L A C K J A C K")}`);
      printLine(`\n${colors.bold.red("You Win!!")}`);
      printLine(
        `\n` +
          colors.bold.red("You won ") +
          colors.bold.red(`$${1.5 * this.player.bet}`)
      );
    } else if (this.dealer.sum > this.player.sum) {
      printLine(`\n${colors.bold.blue("You Lose")}`);
      printLine(
        `\n` +
          colors.bold.blue(`You lost `) +
          colors.bold.blue(`$${this.player.bet}`)
      );
    } else if (this.dealer.sum < this.player.sum) {
      this.player.money += 2 * this.player.bet;
      printLine(`\n${colors.bold.red("You Win!!")}`);
      printLine(
        `\n` +
          colors.bold.red(`You won `) +
          colors.bold.red(`$${this.player.bet}`)
      );
    } else {
      this.player.money += this.player.bet;
      printLine(`\n${colors.bold("Draw")}`);
    }
  }

  private async play() {
    // 山札とディーラー、プレイヤーのステータスをリセットする
    this.reset();

    // プレイヤーの所持金を表示する
    this.player.renderMoney();

    // betをセットする
    await this.setBet();

    // ディーラーとプレイヤーにカードを配り、ゲームを開始する
    this.deal();

    while (this.isPlayerOnAction) {
      // プレイヤーのアクションを入力する
      const inputAction = await this.promptInputAction();
      await this.doPlayerAction(inputAction);
    }

    if (this.player.isBusted) {
      this.checkResult();
      return;
    }

    await this.revealDealersSecondCard();

    while (this.isDealerOnAction) {
      // ディーラーの手札の合計が17かつ手札にエースが含まれるとき、または17未満のとき、条件を満たさなくなるまで以下を繰り返す
      await this.doDealerAction();
    }

    this.checkResult();
    this.player.renderMoney();
  }

  async start() {
    await this.renderTitle();
    await promptInput(colors.bold(`\nPlease Enter to start`));
    while (this.player.money > 0) {
      await this.play();
      if (this.player.money > 0) {
        printLine(colors.bold(`\nPlease Enter to start next game`));
        await promptInput(colors.bold("\n(Enter)"));
      }
    }
    printLine(colors.bold("\nGame Over!!"));
    process.exit(0);
  }
}
