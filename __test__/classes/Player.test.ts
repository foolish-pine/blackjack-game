import colors from "colors";

import { Card } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";
import { Participant } from "../../src/classes/Participant";
import { Player } from "../../src/classes/Player";

import * as printLine from "../../src/utils/printLine";

const mockPrintLine = jest.spyOn(printLine, "printLine").mockImplementation();

afterEach(() => {
  mockPrintLine.mockReset();
});

describe("Playerクラス", () => {
  describe("moneyゲッター", () => {
    it("moneyを返す", () => {
      const player = new Player(new Deck());
      expect(player.money).toBe(1000);
    });
  });

  describe("moneyセッター", () => {
    it("moneyをセットする", () => {
      const player = new Player(new Deck());
      player.money = 2022;
      expect(player.money).toBe(2022);
    });
  });

  describe("betゲッター", () => {
    it("betを返す", () => {
      const player = new Player(new Deck());
      expect(player.bet).toBe(0);
    });
  });

  describe("betセッター", () => {
    it("betをセットする", () => {
      const player = new Player(new Deck());
      player.bet = 100;
      expect(player.bet).toBe(100);
    });
  });

  describe("hasHitゲッター", () => {
    it("hasHitを返す", () => {
      const player = new Player(new Deck());
      expect(player.hasHit).toBe(false);
    });
  });

  describe("hasHitセッター", () => {
    it("hasHitをセットする", () => {
      const player = new Player(new Deck());
      player.hasHit = true;
      expect(player.hasHit).toBe(true);
    });
  });

  describe("hasDoubleDownedゲッター", () => {
    it("hasDoubleDownedを返す", () => {
      const player = new Player(new Deck());
      expect(player.hasDoubleDowned).toBe(false);
    });
  });

  describe("hasDoubleDownedセッター", () => {
    it("hasDoubleDownedをセットする", () => {
      const player = new Player(new Deck());
      player.hasDoubleDowned = true;
      expect(player.hasDoubleDowned).toBe(true);
    });
  });

  describe("isStandingゲッター", () => {
    it("isStandingを返す", () => {
      const player = new Player(new Deck());
      expect(player.isStanding).toBe(false);
    });
  });

  describe("isStandingセッター", () => {
    it("isStandingをセットする", () => {
      const player = new Player(new Deck());
      player.isStanding = true;
      expect(player.isStanding).toBe(true);
    });
  });

  describe("clearStatus()メソッド", () => {
    it("handに空配列を、betに0を、hasHit、hasDoubleDowned、isStandingにfalseを代入する。", () => {
      const player = new Player(new Deck());
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
      const player = new Player(new Deck());
      player.money = 10000;
      player.renderMoney();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        `\n${colors.bold.yellow("Your money: ")}${colors.bold.yellow(`$10000`)}`
      );
    });
  });

  describe("renderHand()メソッド", () => {
    it("ParticipantクラスのrenderHand()メソッドを文字列を文字列`\nYou:    `を引数にして呼び出す", () => {
      const mockParticipantRenderHand = jest.spyOn(
        Participant.prototype,
        "renderHand"
      );
      const player = new Player(new Deck());
      player.renderHand();
      expect(mockParticipantRenderHand).toHaveBeenCalledWith(`\nYou:    `);
    });
  });
  // });
  // describe("renderNewCard()メソッド", () => {
  //   let log: sinon.SinonStub<
  //     [message?: unknown, ...optionalParams: unknown[]],
  //     void
  //   >;

  //   beforeEach(() => {
  //     player = new Player(new Deck());
  //     log = sinon.stub(console, "log");
  //   });

  //   afterEach(() => {
  //     log.restore();
  //   });

  //   it("handの最後の要素のシンボルがハートかダイヤのとき、handの最後の要素を赤色の文字で描画する。", () => {
  //     player.hand = [
  //       new Card(String.fromCodePoint(0x2660), 7, "7"),
  //       new Card(String.fromCodePoint(0x2665), 2, "2"),
  //     ];
  //     player.renderNewCard();
  //     expect(
  //       log.withArgs(
  //         colors.bold("Your new card: ") +
  //           colors.red.bgWhite(` ${String.fromCodePoint(0x2665)} 2 `) +
  //           "\n"
  //       ).calledOnce
  //     ).equal(true);
  //   });
  //   it("handの最後の要素のシンボルがハートかダイヤ以外のとき、handの最後の要素を黒色の文字で描画する。", () => {
  //     player.hand = [
  //       new Card(String.fromCodePoint(0x2665), 2, "2"),
  //       new Card(String.fromCodePoint(0x2660), 7, "7"),
  //     ];
  //     player.renderNewCard();
  //     expect(
  //       log.withArgs(
  //         colors.bold("Your new card: ") +
  //           colors.black.bgWhite(` ${String.fromCodePoint(0x2660)} 7 `) +
  //           "\n"
  //       ).calledOnce
  //     ).equal(true);
  //   });
  //   describe("doubleDown()メソッド", () => {
  //     beforeEach(() => {
  //       player = new Player(new Deck());
  //     });

  //     it("hasDoubleDownedにtrueを代入する。moneyにmoneyからbetを引いた値を代入し、betにbetの2倍の値を代入する。deck.draw()の返り値をhandにpush()する。", () => {
  //       player.money = 1000;
  //       player.bet = 100;
  //       player.hand = [
  //         new Card(String.fromCodePoint(0x2660), 2, "2"),
  //         new Card(String.fromCodePoint(0x2660), 9, "9"),
  //       ];
  //       player.doubleDown();
  //       expect(player.hasDoubleDowned).equal(true);
  //       expect(player.money).equal(900);
  //       expect(player.bet).equal(200);
  //       expect(player.hand).deep.equal([
  //         new Card(String.fromCodePoint(0x2660), 2, "2"),
  //         new Card(String.fromCodePoint(0x2660), 9, "9"),
  //         new Card(String.fromCodePoint(0x2663), 10, "K"),
  //       ]);
  //     });
  //   });
  //   describe("selectAction()メソッド", () => {
  //     let question: sinon.SinonStub;

  //     beforeEach(() => {
  //       player = new Player(new Deck());
  //       question = sinon.stub(readlineSync, "question").callsFake(() => "h");
  //     });

  //     afterEach(() => {
  //       question.restore();
  //     });

  //     it("hasHitがtrueのとき、入力された文字列を返す。", () => {
  //       player.hasHit = true;
  //       expect(player.selectAction()).equal("h");
  //       expect(
  //         question.withArgs(
  //           `${colors.bold("Select Your Action.")} ${colors.bold.green(
  //             "Hit[h]"
  //           )} ${colors.bold("/")} ${colors.bold.yellow(
  //             "Stand[s]"
  //           )}${colors.bold(":")} `
  //         ).calledOnce
  //       ).equal(true);
  //     });
  //     it("hasHitがfalseのとき、入力された文字列を返す。", () => {
  //       expect(player.selectAction()).equal("h");
  //       expect(
  //         question.withArgs(
  //           `${colors.bold("Select Your Action.")} ${colors.bold.green(
  //             "Hit[h]"
  //           )} ${colors.bold("/")} ${colors.bold.cyan(
  //             "DoubleDown[d]"
  //           )} ${colors.bold("/")} ${colors.bold.yellow(
  //             "Stand[s]"
  //           )}${colors.bold(":")} `
  //         ).calledOnce
  //       ).equal(true);
  //     });
  //   });
  // });
});
