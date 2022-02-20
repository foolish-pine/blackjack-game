import figlet from "figlet";
import colors from "colors";

import { Deck } from "../../src/classes/Deck";
import { Dealer } from "../../src/classes/Dealer";
import { Player } from "../../src/classes/Player";
import {
  Game,
  playerActions,
  playerActionsExceptDoubleDown,
} from "../../src/classes/Game";

import { printLine } from "../../src/utils/printLine";
import { promptInput } from "../../src/utils/promptInput";
import { promptSelect } from "../../src/utils/promptSelect";

jest.mock("../../src/utils/printLine");
jest.mock("../../src/utils/promptInput");
jest.mock("../../src/utils/promptSelect");
jest.mock("../../src/classes/Deck");
jest.mock("../../src/classes/Dealer");
jest.mock("../../src/classes/Player");

const mockPrintLine = printLine as jest.Mock;
const mockPromptInput = promptInput as jest.Mock;
const mockPromptSelect = promptSelect as jest.Mock;
const MockDeck = Deck as jest.Mock;
const MockDealer = Dealer as jest.Mock;
const MockPlayer = Player as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("Gameクラス", () => {
  describe("renderTitle()メソッド", () => {
    it("タイトルのアスキーアートを表示する", async () => {
      const game = new Game();

      await game["renderTitle"]();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `${colors.rainbow(
          figlet.textSync("BLACK JACK", {
            font: "Big Chief",
            horizontalLayout: "default",
            verticalLayout: "default",
          })
        )}`
      );
    });
  });

  describe("validateBet()メソッド", () => {
    it("inputBetが数字ではないとき、警告するテキストを引数にprintLine関数を呼び出し、falseを返す", () => {
      const game = new Game();

      const result = game["validateBet"]("text");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\nPlease input a positive integer.`
      );
      expect(result).toBe(false);
    });
    it("inputBetが整数ではないとき、警告するテキストを引数にprintLine関数を呼び出し、falseを返す", () => {
      const game = new Game();

      const result = game["validateBet"]("1.2");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\nPlease input a positive integer.`
      );
      expect(result).toBe(false);
    });
    it("inputBetが0のとき、警告するテキストを引数にprintLine関数を呼び出し、falseを返す", () => {
      const game = new Game();

      const result = game["validateBet"]("0");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\nPlease input a positive integer.`
      );
      expect(result).toBe(false);
    });
    it("inputBetが負の数のとき、警告するテキストを引数にprintLine関数を呼び出し、falseを返す", () => {
      const game = new Game();

      const result = game["validateBet"]("-1");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\nPlease input a positive integer.`
      );
      expect(result).toBe(false);
    });
    it("inputBetがplayer.moneyより大きいとき、警告するテキストを引数にprintLine関数を呼び出し、falseを返す", () => {
      const game = new Game();
      game["player"].money = 1000;

      const result = game["validateBet"]("1001");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\nPlease bet an amount of money you can.`
      );
      expect(result).toBe(false);
    });
    it("上記意外のとき、trueを返す", () => {
      const game = new Game();
      game["player"].money = 1000;

      const result1 = game["validateBet"]("999");
      const result2 = game["validateBet"]("1000");
      expect(result1).toBe(true);
      expect(result2).toBe(true);
    });
  });

  describe("reset()メソッド", () => {
    it("deckを初期化し、dealerとplayerのclearStatusメソッドを呼び出す", () => {
      const game = new Game();

      game["reset"]();
      expect(game["deck"]).toBeInstanceOf(MockDeck);
      expect(game["dealer"].deck).toBe(game["deck"]);
      expect(game["dealer"].clearStatus).toHaveBeenCalledTimes(1);
      expect(game["player"].deck).toBe(game["deck"]);
      expect(game["player"].clearStatus).toHaveBeenCalledTimes(1);
    });
  });

  describe("deal()メソッド", () => {
    it("dealerとplayerのdealメソッドを呼び出す。dealerとplayerのrenderHandメソッドを呼び出す。", () => {
      const game = new Game();

      game["deal"]();
      expect(game["dealer"].deal).toHaveBeenCalledTimes(1);
      expect(game["player"].deal).toHaveBeenCalledTimes(1);
      expect(game["dealer"].renderHand).toHaveBeenCalledTimes(1);
      expect(game["player"].renderHand).toHaveBeenCalledTimes(1);
    });
  });

  describe("promptInputBet()メソッド", () => {
    it("文字列を引数にprintLine関数を呼び出し、promptInput関数からの戻り値を返す", async () => {
      mockPromptInput.mockResolvedValue("100");
      const game = new Game();

      const result = await game["promptInputBet"]();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\n${colors.bold("Set Your Bet.")}`
      );
      expect(mockPromptInput).toHaveBeenCalledTimes(1);
      expect(result).toBe("100");
    });
  });

  describe("setBet()メソッド", () => {
    it("標準入力から値を受け取る。バリデーションをパスした場合、その値をNumber型に変化してplayer.betに代入する。player.moneyからplayer.betを引いた値をplayer.moneyに代入する。文字列を引数にprintLine関数、promptInput関数を呼び出す。", async () => {
      const mockPromptInputBet = jest.fn().mockResolvedValue("100");
      Game.prototype["promptInputBet"] = mockPromptInputBet;
      const game = new Game();
      game["player"].money = 1000;

      await game["setBet"]();
      expect(mockPromptInputBet).toHaveBeenCalledTimes(1);
      expect(game["player"].bet).toBe(100);
      expect(game["player"].money).toBe(900);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold.yellow(`\nYour bet: $100`)
      );
      expect(mockPromptInput).toHaveBeenCalledTimes(1);
      expect(mockPromptInput).toHaveBeenCalledWith(colors.bold(`\n(Enter)`));
    });
    it("標準入力から値を受け取る。バリデーションをパスした場合、その値をNumber型に変化してplayer.betに代入する。バリデーションをパスしなかった場合、パスするまで標準入力から値を受け取る。player.moneyからplayer.betを引いた値をplayer.moneyに代入する。文字列を引数にprintLine関数、promptInput関数を呼び出す。", async () => {
      const mockPromptInputBet = jest
        .fn()
        .mockResolvedValueOnce("NaN")
        .mockResolvedValueOnce("NaN")
        .mockResolvedValueOnce(100);
      Game.prototype["promptInputBet"] = mockPromptInputBet;
      const mockValidateBet = jest
        .fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
      Game.prototype["validateBet"] = mockValidateBet;
      const game = new Game();
      game["player"].money = 1000;

      await game["setBet"]();
      expect(mockPromptInputBet).toHaveBeenCalledTimes(3);
      expect(game["player"].bet).toBe(100);
      expect(game["player"].money).toBe(900);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold.yellow(`\nYour bet: $100`)
      );
      expect(mockPromptInput).toHaveBeenCalledTimes(1);
      expect(mockPromptInput).toHaveBeenCalledWith(colors.bold(`\n(Enter)`));
    });
  });

  describe("isPlayerOnAction()ゲッター", () => {
    it("player.isBlackjackがtrueのとき、falseを返す", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: true,
          isBusted: false,
          isStanding: false,
          hasDoubleDowned: false,
          sum: 21,
        };
      });
      const game = new Game();

      expect(game["isPlayerOnAction"]).toBe(false);
    });
    it("player.isBustedがtrueのとき、falseを返す", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          isBusted: true,
          isStanding: false,
          hasDoubleDowned: false,
          sum: 22,
        };
      });
      const game = new Game();

      expect(game["isPlayerOnAction"]).toBe(false);
    });
    it("player.isStandingがtrueのとき、falseを返す", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          isBusted: false,
          isStanding: true,
          hasDoubleDowned: false,
          sum: 20,
        };
      });
      const game = new Game();

      expect(game["isPlayerOnAction"]).toBe(false);
    });
    it("player.hasDoubleDownedがtrueのとき、falseを返す", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          isBusted: false,
          isStanding: false,
          hasDoubleDowned: true,
          sum: 20,
        };
      });
      const game = new Game();

      expect(game["isPlayerOnAction"]).toBe(false);
    });
    it("player.sum < 21がfalseのとき、falseを返す", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          isBusted: false,
          isStanding: false,
          hasDoubleDowned: false,
          sum: 21,
        };
      });
      const game = new Game();

      expect(game["isPlayerOnAction"]).toBe(false);
    });
    it("上記がすべてfalseのとき、trueを返す", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          isBusted: false,
          isStanding: false,
          hasDoubleDowned: false,
          sum: 20,
        };
      });
      const game = new Game();

      expect(game["isPlayerOnAction"]).toBe(true);
    });
  });

  describe("promptInputAction()メソッド", () => {
    it("player.hasHitがtrueのとき、文字列とplayerActionsExceptDoubleDownを引数にpromptSelect関数を呼び出す", async () => {
      const game = new Game();
      game["player"].hasHit = true;
      game["player"].money = 200;
      game["player"].bet = 100;

      await game["promptInputAction"]();
      expect(mockPromptSelect).toHaveBeenCalledTimes(1);
      expect(mockPromptSelect).toHaveBeenCalledWith(
        `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
          "Hit[h]"
        )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`,
        playerActionsExceptDoubleDown
      );
    });
    it("player.money - player.bet < 0がtrueのとき、文字列とplayerActionsExceptDoubleDownを引数にpromptSelect関数を呼び出す", async () => {
      const game = new Game();
      game["player"].hasHit = false;
      game["player"].money = 100;
      game["player"].bet = 200;

      await game["promptInputAction"]();
      expect(mockPromptSelect).toHaveBeenCalledTimes(1);
      expect(mockPromptSelect).toHaveBeenCalledWith(
        `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
          "Hit[h]"
        )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`,
        playerActionsExceptDoubleDown
      );
    });
    it("player.hasHitとplayer.money - player.bet < 0がともにfalseのとき、文字列とplayerActionsを引数にpromptSelect関数を呼び出す", async () => {
      const game = new Game();
      game["player"].hasHit = false;
      game["player"].money = 200;
      game["player"].bet = 100;

      await game["promptInputAction"]();
      expect(mockPromptSelect).toHaveBeenCalledTimes(1);
      expect(mockPromptSelect).toHaveBeenCalledWith(
        `${colors.bold("\nSelect Your Action.")} ${colors.bold.green(
          "Hit[h]"
        )} ${colors.bold("/")} ${colors.bold.cyan(
          "DoubleDown[d]"
        )} ${colors.bold("/")} ${colors.bold.yellow("Stand[s]")}\n`,
        playerActions
      );
    });
  });

  describe("doPlayerAction()メソッド", () => {
    it("引数inputActionがhのとき、hitの処理を行う", async () => {
      const game = new Game();

      await game["doPlayerAction"]("h");
      expect(game["player"].hit).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold.green(`\nYou hit.`)
      );
      expect(mockPromptInput).toHaveBeenCalledTimes(2);
      expect(mockPromptInput).toHaveBeenCalledWith(colors.bold(`\n(Enter)`));
      expect(game["player"].renderNewCard).toHaveBeenCalledTimes(1);
      expect(game["dealer"].renderHand).toHaveBeenCalledTimes(1);
      expect(game["player"].renderHand).toHaveBeenCalledTimes(1);
    });
    it("引数inputActionがdのとき、double downの処理を行う", async () => {
      const game = new Game();

      await game["doPlayerAction"]("d");
      expect(game["player"].doubleDown).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold.cyan(`\nYou doubled down.`)
      );
      expect(mockPromptInput).toHaveBeenCalledTimes(2);
      expect(mockPromptInput).toHaveBeenCalledWith(colors.bold(`\n(Enter)`));
      expect(game["player"].renderNewCard).toHaveBeenCalledTimes(1);
      expect(game["dealer"].renderHand).toHaveBeenCalledTimes(1);
      expect(game["player"].renderHand).toHaveBeenCalledTimes(1);
    });
    it("引数inputActionがsのとき、standの処理を行う", async () => {
      const game = new Game();

      await game["doPlayerAction"]("s");
      expect(game["player"].stand).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold.yellow(`\nYou stand.`)
      );
      expect(mockPromptInput).toHaveBeenCalledTimes(2);
      expect(mockPromptInput).toHaveBeenCalledWith(colors.bold(`\n(Enter)`));
      expect(game["dealer"].renderHand).toHaveBeenCalledTimes(1);
      expect(game["player"].renderHand).toHaveBeenCalledTimes(1);
    });
  });

  describe("isDealerOnAction()メソッド", () => {
    it("dealer.sumが17かつdealer.hasAceがtrueのとき、trueを返す", async () => {
      MockDealer.mockImplementation(() => {
        return {
          sum: 17,
          hasAce: true,
        };
      });
      const game = new Game();

      expect(game["isDealerOnAction"]).toBe(true);
    });
    it("dealer.sumが17未満のとき、trueを返す", async () => {
      MockDealer.mockImplementation(() => {
        return {
          sum: 16,
        };
      });
      const game = new Game();

      expect(game["isDealerOnAction"]).toBe(true);
    });
    it("dealer.sumが18以上のとき、falseを返す", async () => {
      MockDealer.mockImplementation(() => {
        return {
          sum: 18,
        };
      });
      const game = new Game();

      expect(game["isDealerOnAction"]).toBe(false);
    });
    it("dealer.sumが17かつdealer.hasAceがfalseのとき、trueを返す", async () => {
      MockDealer.mockImplementationOnce(() => {
        return {
          sum: 17,
          hasAce: false,
        };
      });
      const game = new Game();

      expect(game["isDealerOnAction"]).toBe(false);
    });
  });

  describe("doDealerAction()メソッド", () => {
    it("", async () => {
      const game = new Game();

      await game["doDealerAction"]();
      expect(game["dealer"].hit).toHaveBeenCalledTimes(1);
      expect(game["dealer"].renderNewCard).toHaveBeenCalledTimes(1);
      expect(game["dealer"].renderHand).toHaveBeenCalledTimes(1);
      expect(game["player"].renderHand).toHaveBeenCalledTimes(1);
      expect(mockPromptInput).toHaveBeenCalledTimes(1);
      expect(mockPromptInput).toHaveBeenCalledWith(colors.bold(`\n(Enter)`));
    });
  });

  describe("checkResult()メソッド", () => {
    it("dealer.isBustedがtrueのとき、player.betを2倍した値をplayer.moneyに足す。printLine関数でテキストを表示する", () => {
      MockDealer.mockImplementation(() => {
        return {
          isBusted: true,
        };
      });
      const game = new Game();
      game["player"].money = 1000;
      game["player"].bet = 100;

      game["checkResult"]();
      expect(game["player"].money).toBe(1200);
      expect(mockPrintLine).toHaveBeenCalledTimes(3);
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        1,
        `\n${colors.bold.red("Dealer Busted")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        2,
        `\n${colors.bold.red("You Win!!")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        3,
        `\n` + colors.bold.red(`You won `) + colors.bold.red(`$100`)
      );
    });
    it("player.isBustedがtrueのとき、printLine関数でテキストを表示する", () => {
      MockPlayer.mockImplementation(() => {
        return {
          isBusted: true,
        };
      });
      const game = new Game();
      game["player"].bet = 100;

      game["checkResult"]();
      expect(mockPrintLine).toHaveBeenCalledTimes(3);
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        1,
        `\n${colors.bold.blue("You Busted")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        2,
        `\n${colors.bold.blue("You Lose")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        3,
        `\n` + colors.bold.blue(`You lost `) + colors.bold.blue(`$100`)
      );
    });
    it("player.isBlackjackとplayer.isBlackjackがともにtrueのとき、player.betの値をplayer.moneyに足す。printLine関数でテキストを表示する", async () => {
      MockDealer.mockImplementation(() => {
        return {
          isBlackjack: true,
        };
      });
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: true,
        };
      });
      const game = new Game();
      game["player"].money = 1000;
      game["player"].bet = 100;

      game["checkResult"]();
      expect(game["player"].money).toBe(1100);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(`\n${colors.bold("Draw")}`);
    });
    it("dealer.isBlackjackがtrueでplayer.isBlackjackがfalseのとき、printLine関数でテキストを表示する", async () => {
      MockDealer.mockImplementation(() => {
        return {
          isBlackjack: true,
        };
      });
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
        };
      });
      const game = new Game();
      game["player"].bet = 100;

      game["checkResult"]();
      expect(mockPrintLine).toHaveBeenCalledTimes(2);
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        1,
        `\n${colors.bold.blue("You Lose")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        2,
        `\n` + colors.bold.blue(`You lost `) + colors.bold.blue(`$100`)
      );
    });
    it("dealer.isBlackjackがfalseでplayer.isBlackjackがtrueのとき、printLine関数でテキストを表示する", async () => {
      MockDealer.mockImplementation(() => {
        return {
          isBlackjack: false,
        };
      });
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: true,
        };
      });
      const game = new Game();
      game["player"].money = 1000;
      game["player"].bet = 100;

      game["checkResult"]();
      expect(game["player"].money).toBe(1250);
      expect(mockPrintLine).toHaveBeenCalledTimes(3);
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        1,
        `\n${colors.rainbow("B L A C K J A C K")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        2,
        `\n${colors.bold.red("You Win!!")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        3,
        `\n` + colors.bold.red(`You won `) + colors.bold.red(`$150`)
      );
    });
    it("player.isBlackjackとplayer.isBlackjackがともにfalseかつdealer.sumがplayer.sumより大きいとき、printLine関数でテキストを表示する", async () => {
      MockDealer.mockImplementation(() => {
        return {
          isBlackjack: false,
          sum: 20,
        };
      });
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          sum: 19,
        };
      });
      const game = new Game();
      game["player"].bet = 100;

      game["checkResult"]();
      expect(mockPrintLine).toHaveBeenCalledTimes(2);
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        1,
        `\n${colors.bold.blue("You Lose")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        2,
        `\n` + colors.bold.blue("You lost ") + colors.bold.blue(`$100`)
      );
    });
    it("player.isBlackjackとplayer.isBlackjackがともにfalseかつdealer.sumがplayer.sumより小さいとき、player.betを2倍した値をplayer.moneyに足す。printLine関数でテキストを表示する", async () => {
      MockDealer.mockImplementation(() => {
        return {
          isBlackjack: false,
          sum: 19,
        };
      });
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          sum: 20,
        };
      });
      const game = new Game();
      game["player"].money = 1000;
      game["player"].bet = 100;

      game["checkResult"]();
      expect(game["player"].money).toBe(1200);
      expect(mockPrintLine).toHaveBeenCalledTimes(2);
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        1,
        `\n${colors.bold.red("You Win!!")}`
      );
      expect(mockPrintLine).toHaveBeenNthCalledWith(
        2,
        `\n` + colors.bold.red(`You won `) + colors.bold.red(`$100`)
      );
    });
    it("上記以外のとき、player.betの値をplayer.moneyに足す。printLine関数でテキストを表示する", async () => {
      MockDealer.mockImplementation(() => {
        return {
          isBlackjack: false,
          sum: 20,
        };
      });
      MockPlayer.mockImplementation(() => {
        return {
          isBlackjack: false,
          sum: 20,
        };
      });
      const game = new Game();
      game["player"].money = 1000;
      game["player"].bet = 100;

      game["checkResult"]();
      expect(game["player"].money).toBe(1100);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(`\n${colors.bold("Draw")}`);
    });
  });
});