import colors from "colors";

import { Card, cardSymbols } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";
import { Participant } from "../../src/classes/Participant";
import { Player } from "../../src/classes/Player";

import { printLine } from "../../src/utils/printLine";

jest.mock("../../src/utils/printLine");
jest.mock("../../src/classes/Card");
jest.mock("../../src/classes/Deck");
jest.mock("../../src/classes/Participant");

const mockPrintLine = printLine as jest.Mock;
const MockCard = Card as jest.Mock;
const MockDeck = Deck as jest.Mock;
const MockParticipant = Participant as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("Playerクラス", () => {
  describe("moneyゲッター", () => {
    it("moneyを返す", () => {
      const player = new Player(new MockDeck());

      expect(player.money).toBe(1000);
    });
  });

  describe("moneyセッター", () => {
    it("moneyをセットする", () => {
      const player = new Player(new MockDeck());

      player.money = 2022;
      expect(player.money).toBe(2022);
    });
  });

  describe("betゲッター", () => {
    it("betを返す", () => {
      const player = new Player(new MockDeck());

      expect(player.bet).toBe(0);
    });
  });

  describe("betセッター", () => {
    it("betをセットする", () => {
      const player = new Player(new MockDeck());

      player.bet = 100;
      expect(player.bet).toBe(100);
    });
  });

  describe("hasHitゲッター", () => {
    it("hasHitを返す", () => {
      const player = new Player(new MockDeck());

      expect(player.hasHit).toBe(false);
    });
  });

  describe("hasHitセッター", () => {
    it("hasHitをセットする", () => {
      const player = new Player(new MockDeck());

      player.hasHit = true;
      expect(player.hasHit).toBe(true);
    });
  });

  describe("hasDoubleDownedゲッター", () => {
    it("hasDoubleDownedを返す", () => {
      const player = new Player(new MockDeck());

      expect(player.hasDoubleDowned).toBe(false);
    });
  });

  describe("hasDoubleDownedセッター", () => {
    it("hasDoubleDownedをセットする", () => {
      const player = new Player(new MockDeck());

      player.hasDoubleDowned = true;
      expect(player.hasDoubleDowned).toBe(true);
    });
  });

  describe("isStandingゲッター", () => {
    it("isStandingを返す", () => {
      const player = new Player(new MockDeck());

      expect(player.isStanding).toBe(false);
    });
  });

  describe("isStandingセッター", () => {
    it("isStandingをセットする", () => {
      const player = new Player(new MockDeck());

      player.isStanding = true;
      expect(player.isStanding).toBe(true);
    });
  });

  describe("clearStatus()メソッド", () => {
    it("handに空配列を、betに0を、hasHit、hasDoubleDowned、isStandingにfalseを代入する。", () => {
      const player = new Player(new MockDeck());

      player.clearStatus();
      expect(player.hand).toStrictEqual([]);
      expect(player.bet).toBe(0);
      expect(player.hasHit).toBe(false);
      expect(player.hasDoubleDowned).toBe(false);
      expect(player.isStanding).toBe(false);
    });
  });

  describe("renderMoney()メソッド", () => {
    it("moneyを描画する。", () => {
      const player = new Player(new MockDeck());

      player.money = 10000;
      player.renderMoney();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\n${colors.bold.yellow("Your money: ")}${colors.bold.yellow(`$10000`)}`
      );
    });
  });

  describe("renderHand()メソッド", () => {
    it("handに応じた文字列を生成し、その文字列を引数にしてprintLine関数を呼び出す。手札に黒の絵札が含まれるとき", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("club"), 1, "A");
      const mockCard2 = new MockCard(cardSymbols.get("spade"), 2, "2");
      const player = new Player(new MockDeck());
      player.hand = [mockCard1, mockCard2];

      player.renderHand();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nYou:    `) +
          colors.black.bgWhite(` ${cardSymbols.get("club")} A `) +
          `  ` +
          colors.black.bgWhite(` ${cardSymbols.get("spade")} 2 `) +
          `  ` +
          `\n`
      );
    });
    it("handに応じた文字列を生成し、その文字列を引数にしてprintLine関数を呼び出す。手札に赤の絵札が含まれるとき", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("heart"), 10, "J");
      const mockCard2 = new MockCard(cardSymbols.get("diamond"), 10, "Q");
      const player = new Player(new MockDeck());
      player.hand = [mockCard1, mockCard2];

      player.renderHand();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nYou:    `) +
          colors.red.bgWhite(` ${cardSymbols.get("heart")} J `) +
          `  ` +
          colors.red.bgWhite(` ${cardSymbols.get("diamond")} Q `) +
          `  ` +
          `\n`
      );
    });
  });

  describe("renderNewCard()メソッド", () => {
    it("親クラスのrenderNewCard()メソッドを文字列を文字列`\nYour new card: `を引数にして呼び出す", () => {
      const renderNewCard = jest.fn();
      MockParticipant.prototype.renderNewCard = renderNewCard;
      const player = new Player(new MockDeck());

      player.renderNewCard();
      expect(renderNewCard).toHaveBeenCalledWith(`\nYour new card: `);
    });
  });

  describe("hit()メソッド", () => {
    it("hasHitにtrueを代入し、親クラスのhit()メソッドを呼び出す", () => {
      const hit = jest.fn();
      MockParticipant.prototype.hit = hit;
      const player = new Player(new MockDeck());

      player.hit();
      expect(player.hasHit).toBe(true);
      expect(hit).toHaveBeenCalledTimes(1);
    });
  });

  describe("doubleDown()メソッド", () => {
    it("hasDoubleDownedにtrueを代入する。moneyにmoneyからbetを引いた値を代入する。betにbetの2倍の値を代入する。親クラスのhit()メソッドを呼び出す", () => {
      const hit = jest.fn();
      MockParticipant.prototype.hit = hit;
      const player = new Player(new MockDeck());
      player.money = 1000;
      player.bet = 100;

      player.doubleDown();
      expect(player.hasDoubleDowned).toBe(true);
      expect(player.money).toBe(900);
      expect(player.bet).toBe(200);
      expect(hit).toHaveBeenCalledTimes(1);
    });
  });

  describe("stand()メソッド", () => {
    it("isStandingにtrueを代入する", () => {
      const player = new Player(new MockDeck());

      player.stand();
      expect(player.isStanding).toBe(true);
    });
  });
});
