import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as colors from "colors";

import { Card } from "../src/classes/Card";
import { Deck } from "../src/classes/Deck";
import { Dealer } from "../src/classes/Dealer";

describe("Dealerクラス", () => {
  let dealer = new Dealer(new Deck());

  describe("isSecondCardOpenゲッター", () => {
    beforeEach(() => {
      dealer = new Dealer(new Deck());
    });

    it("isSecondCardOpenを返す。", () => {
      expect(dealer.isSecondCardOpen).equal(false);
    });
  });
  describe("deckセッター", () => {
    beforeEach(() => {
      dealer = new Dealer(new Deck());
    });

    it("deckをセットする。", () => {
      dealer.isSecondCardOpen = true;
      expect(dealer.isSecondCardOpen).equal(true);
    });
  });
  describe("clearメソッド", () => {
    beforeEach(() => {
      dealer = new Dealer(new Deck());
    });

    it("handに空配列を、isSecondCardOpenにfalseを代入する。", () => {
      dealer.clear();
      expect(dealer.hand).deep.equal([]);
      expect(dealer.isSecondCardOpen).equal(false);
    });
  });
  describe("renderSecondCard()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;

    beforeEach(() => {
      dealer = new Dealer(new Deck());
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("handの2つ目の要素のシンボルがハートかダイヤのとき、isSecondCardOpenをtrueにし、handの2つ目の要素を赤色の文字で描画する。", () => {
      dealer.hand = [
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2665), 2, "2"),
      ];
      dealer.renderSecondCard();
      expect(dealer.isSecondCardOpen).equal(true);
      expect(
        log.withArgs(
          colors.bold("Dealer's second card: ") +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2665)} 2 `) +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    it("handの2つ目の要素のシンボルがそれ以外のとき、isSecondCardOpenをtrueにし、handの2つ目の要素を黒色の文字で描画する。", () => {
      dealer.hand = [
        new Card(String.fromCodePoint(0x2665), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 7, "7"),
      ];
      dealer.renderSecondCard();
      expect(dealer.isSecondCardOpen).equal(true);
      expect(
        log.withArgs(
          colors.bold("Dealer's second card: ") +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2660)} 7 `) +
            "\n"
        ).calledOnce
      ).equal(true);
    });
  });
  describe("renderHand()メソッド", () => {
    let log: sinon.SinonStub<
      [message?: unknown, ...optionalParams: unknown[]],
      void
    >;

    beforeEach(() => {
      dealer = new Dealer(new Deck());
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("isSecondCardOpenがtrueのとき、すべてのhandを描画する。", () => {
      dealer.isSecondCardOpen = true;
      dealer.hand = [
        new Card(String.fromCodePoint(0x2665), 10, "A"),
        new Card(String.fromCodePoint(0x2666), 10, "J"),
        new Card(String.fromCodePoint(0x2663), 10, "Q"),
        new Card(String.fromCodePoint(0x2660), 10, "K"),
      ];
      dealer.renderHand();
      expect(
        log.withArgs(
          colors.bold("Dealer: ") +
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
    it("isSecondCardOpenがfalseのとき、handの1番目のみ描画する。", () => {
      dealer.isSecondCardOpen = false;
      dealer.hand = [
        new Card(String.fromCodePoint(0x2665), 10, "A"),
        new Card(String.fromCodePoint(0x2666), 10, "J"),
      ];
      dealer.renderHand();
      expect(
        log.withArgs(
          colors.bold("Dealer: ") +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2665)} A `) +
            "  " +
            colors.black.bgWhite(" ??? ") +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    it("isSecondCardOpenがfalseのとき、handの1番目のみ描画する。", () => {
      dealer.isSecondCardOpen = false;
      dealer.hand = [
        new Card(String.fromCodePoint(0x2666), 10, "A"),
        new Card(String.fromCodePoint(0x2666), 10, "J"),
      ];
      dealer.renderHand();
      expect(
        log.withArgs(
          colors.bold("Dealer: ") +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2666)} A `) +
            "  " +
            colors.black.bgWhite(" ??? ") +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    it("isSecondCardOpenがfalseのとき、handの1番目のみ描画する。", () => {
      dealer.isSecondCardOpen = false;
      dealer.hand = [
        new Card(String.fromCodePoint(0x2663), 10, "A"),
        new Card(String.fromCodePoint(0x2666), 10, "J"),
      ];
      dealer.renderHand();
      expect(
        log.withArgs(
          colors.bold("Dealer: ") +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2663)} A `) +
            "  " +
            colors.black.bgWhite(" ??? ") +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    it("isSecondCardOpenがfalseのとき、handの1番目のみ描画する。", () => {
      dealer.isSecondCardOpen = false;
      dealer.hand = [
        new Card(String.fromCodePoint(0x2660), 10, "A"),
        new Card(String.fromCodePoint(0x2666), 10, "J"),
      ];
      dealer.renderHand();
      expect(
        log.withArgs(
          colors.bold("Dealer: ") +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2660)} A `) +
            "  " +
            colors.black.bgWhite(" ??? ") +
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
      dealer = new Dealer(new Deck());
      log = sinon.stub(console, "log");
    });

    afterEach(() => {
      log.restore();
    });

    it("handの最後の要素のシンボルがハートかダイヤのとき、handの最後の要素を赤色の文字で描画する。", () => {
      dealer.hand = [
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2665), 2, "2"),
      ];
      dealer.renderNewCard();
      expect(
        log.withArgs(
          colors.bold("Dealer's new card: ") +
            colors.red.bgWhite(` ${String.fromCodePoint(0x2665)} 2 `) +
            "\n"
        ).calledOnce
      ).equal(true);
    });
    it("handの最後の要素のシンボルがそれ以外のとき、handの最後の要素を黒色の文字で描画する。", () => {
      dealer.hand = [
        new Card(String.fromCodePoint(0x2665), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 7, "7"),
      ];
      dealer.renderNewCard();
      expect(
        log.withArgs(
          colors.bold("Dealer's new card: ") +
            colors.black.bgWhite(` ${String.fromCodePoint(0x2660)} 7 `) +
            "\n"
        ).calledOnce
      ).equal(true);
    });
  });
});
