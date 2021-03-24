import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as colors from "colors";
import * as readlineSync from "readline-sync";

import { Card } from "../src/classes/Card";
import { Deck } from "../src/classes/Deck";
import { Player } from "../src/classes/Player";

describe("Playerクラス", () => {
  let player = new Player(new Deck());

  describe("moneyゲッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("moneyを返す。", () => {
      expect(player.money).equal(1000);
    });
  });
  describe("moneyセッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("moneyをセットする。", () => {
      player.money = 2021;
      expect(player.money).equal(2021);
    });
  });
  describe("betゲッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("betを返す。", () => {
      player.bet = 777;
      expect(player.bet).equal(777);
    });
  });
  describe("betセッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("betをセットする。", () => {
      player.bet = 100;
      expect(player.bet).equal(100);
    });
  });
  describe("hasHitゲッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("hasHitを返す。", () => {
      expect(player.hasHit).equal(false);
    });
  });
  describe("hasHitセッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("hasHitをセットする。", () => {
      player.hasHit = true;
      expect(player.hasHit).equal(true);
    });
  });
  describe("hasDoubleDownedゲッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("hasDoubleDownedを返す。", () => {
      expect(player.hasDoubleDowned).equal(false);
    });
  });
  describe("hasDoubleDownedセッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("hasDoubleDownedをセットする。", () => {
      player.hasDoubleDowned = true;
      expect(player.hasDoubleDowned).equal(true);
    });
  });
  describe("isStandingゲッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("isStandingを返す。", () => {
      expect(player.isStanding).equal(false);
    });
  });
  describe("isStandingセッター", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("isStandingをセットする。", () => {
      player.isStanding = true;
      expect(player.isStanding).equal(true);
    });
  });
  describe("clearメソッド", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("handに空配列を、betに0を、hasHit、hasDoubleDowned、isStandingにfalseを代入する。", () => {
      player.clear();
      expect(player.hand).deep.equal([]);
      expect(player.bet).equal(0);
      expect(player.hasHit).equal(false);
      expect(player.hasDoubleDowned).equal(false);
      expect(player.isStanding).equal(false);
    });
  });
  describe("renderMoney()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;

    beforeEach(() => {
      player = new Player(new Deck());
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("moneyを描画する。", () => {
      player.money = 10000;
      player.renderMoney();
      expect(
        log.withArgs(
          colors.bold.yellow("Your money: ") + colors.bold.yellow(`$10000`)
        ).calledOnce
      ).equal(true);
    });
  });
  describe("setBet()メソッド", () => {
    beforeEach(() => {
      player = new Player(new Deck());
    });

    it("正常系：数字を入力したとき、betに入力値を代入し、moneyにmoneyからbetを引いた値を代入する。", () => {
      player.setBet("100");
      expect(player.bet).equal(100);
      expect(player.money).equal(900);
    });
    it("異常系：数字に変換できない値を入力したとき、エラーを投げる。", () => {
      expect(() => player.setBet("string")).throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("異常系：小数をもつ正の数字を入力したとき、エラーを投げる。", () => {
      expect(() => player.setBet("12.345")).throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("異常系：負の数字を入力したとき、エラーを投げる。", () => {
      expect(() => player.setBet("-100")).throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("異常系：moneyの値より大きい数字を入力したとき、エラーを投げる。", () => {
      expect(() => player.setBet("1001")).throw(
        Error,
        "\nPlease bet an amount of money you can."
      );
    });
  });
  describe("renderHand()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;

    beforeEach(() => {
      player = new Player(new Deck());
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("handを描画する。", () => {
      player.hand = [
        new Card(String.fromCodePoint(0x2665), 10, "A"),
        new Card(String.fromCodePoint(0x2666), 10, "J"),
        new Card(String.fromCodePoint(0x2663), 10, "Q"),
        new Card(String.fromCodePoint(0x2660), 10, "K"),
      ];
      player.renderHand();
      expect(
        log.withArgs(
          colors.bold("You:    ") +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2665)} A `) +
            "  " +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2666)} J `) +
            "  " +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2663)} Q `) +
            "  " +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2660)} K `) +
            "  " +
            "\n"
        ).calledOnce
      ).equal(true);
    });
  });
  describe("renderNewCard()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;

    beforeEach(() => {
      player = new Player(new Deck());
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("handの最後の要素のシンボルがハートかダイヤのとき、handの最後の要素を赤色の文字で描画する。", () => {
      player.hand = [
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2665), 2, "2"),
      ];
      player.renderNewCard();
      expect(
        log.withArgs(
          colors.bold("Your new card: ") +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2665)} 2 `) +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    it("handの最後の要素のシンボルがハートかダイヤ以外のとき、handの最後の要素を黒色の文字で描画する。", () => {
      player.hand = [
        new Card(String.fromCodePoint(0x2665), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 7, "7"),
      ];
      player.renderNewCard();
      expect(
        log.withArgs(
          colors.bold("Your new card: ") +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2660)} 7 `) +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    describe("doubleDown()メソッド", () => {
      beforeEach(() => {
        player = new Player(new Deck());
      });

      it("hasDoubleDownedにtrueを代入する。moneyにmoneyからbetを引いた値を代入し、betにbetの2倍の値を代入する。deck.draw()の返り値をhandにpush()する。", () => {
        player.money = 1000;
        player.bet = 100;
        player.hand = [
          new Card(String.fromCodePoint(0x2660), 2, "2"),
          new Card(String.fromCodePoint(0x2660), 9, "9"),
        ];
        player.doubleDown();
        expect(player.hasDoubleDowned).equal(true);
        expect(player.money).equal(900);
        expect(player.bet).equal(200);
        expect(player.hand).deep.equal([
          new Card(String.fromCodePoint(0x2660), 2, "2"),
          new Card(String.fromCodePoint(0x2660), 9, "9"),
          new Card(String.fromCodePoint(0x2663), 10, "K"),
        ]);
      });
    });
    describe("selectAction()メソッド", () => {
      let question: sinon.SinonStub;

      beforeEach(() => {
        player = new Player(new Deck());
        question = sinon.stub(readlineSync, "question").callsFake(() => "h");
      });

      afterEach(() => {
        question.restore();
      });

      it("hasHitがtrueのとき、入力された文字列を返す。", () => {
        player.hasHit = true;
        expect(player.selectAction()).equal("h");
        expect(
          question.withArgs(
            `${colors.bold("Select Your Action.")} ${colors.bold.green(
              "Hit[h]"
            )} ${colors.bold("/")} ${colors.bold.yellow(
              "Stand[s]"
            )}${colors.bold(":")} `
          ).calledOnce
        ).equal(true);
      });
      it("hasHitがfalseのとき、入力された文字列を返す。", () => {
        expect(player.selectAction()).equal("h");
        expect(
          question.withArgs(
            `${colors.bold("Select Your Action.")} ${colors.bold.green(
              "Hit[h]"
            )} ${colors.bold("/")} ${colors.bold.cyan(
              "DoubleDown[d]"
            )} ${colors.bold("/")} ${colors.bold.yellow(
              "Stand[s]"
            )}${colors.bold(":")} `
          ).calledOnce
        ).equal(true);
      });
    });
  });
});
