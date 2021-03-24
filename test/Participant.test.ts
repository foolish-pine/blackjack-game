import { describe, it } from "mocha";
import { expect } from "chai";

import { Card } from "../src/classes/Card";
import { Deck } from "../src/classes/Deck";
import { Participant } from "../src/classes/Participant";

describe("Participantクラス", () => {
  const participant1 = new Participant(new Deck());
  const participant2 = new Participant(new Deck());
  const participant3 = new Participant(new Deck());
  const participant4 = new Participant(new Deck());
  const participant5 = new Participant(new Deck());
  const participant6 = new Participant(new Deck());
  const participant7 = new Participant(new Deck());
  const participant8 = new Participant(new Deck());
  const participant9 = new Participant(new Deck());
  const participant10 = new Participant(new Deck());
  const participant11 = new Participant(new Deck());
  participant1.hand = [
    new Card(String.fromCodePoint(0x2660), 2, "2"),
    new Card(String.fromCodePoint(0x2660), 8, "8"),
  ];
  participant2.hand = [
    new Card(String.fromCodePoint(0x2660), 2, "2"),
    new Card(String.fromCodePoint(0x2660), 9, "9"),
  ];
  participant3.hand = [
    new Card(String.fromCodePoint(0x2660), 3, "3"),
    new Card(String.fromCodePoint(0x2660), 9, "9"),
  ];
  participant4.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 9, "9"),
  ];
  participant5.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 10, "10"),
  ];
  participant6.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 2, "2"),
    new Card(String.fromCodePoint(0x2660), 9, "9"),
  ];
  participant7.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 8, "8"),
  ];
  participant8.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 3, "3"),
    new Card(String.fromCodePoint(0x2660), 6, "6"),
  ];
  participant9.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 3, "3"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
  ];
  participant10.hand = [
    new Card(String.fromCodePoint(0x2660), 5, "5"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
    new Card(String.fromCodePoint(0x2660), 10, "J"),
  ];
  participant11.hand = [
    new Card(String.fromCodePoint(0x2660), 5, "5"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
    new Card(String.fromCodePoint(0x2660), 10, "J"),
  ];
  describe("deckゲッター", () => {
    it("deckを返す。", () => {
      expect(participant1.deck).deep.equal(new Deck());
    });
  });
  describe("deckセッター", () => {
    it("deckをセットする。", () => {
      participant1.deck = new Deck();
      expect(participant1.deck).deep.equal(new Deck());
    });
  });
  describe("handゲッター", () => {
    it("handを返す。", () => {
      expect(participant1.hand).deep.equal([
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 8, "8"),
      ]);
    });
  });
  describe("handセッター", () => {
    it("handをセットする。", () => {
      participant11.hand = [
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      expect(participant11.hand).deep.equal([
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ]);
    });
  });
  describe("sumゲッター", () => {
    it("handの数字の合計を返す。", () => {
      expect(participant1.sum).equal(10);
      expect(participant2.sum).equal(11);
      expect(participant3.sum).equal(12);
      expect(participant4.sum).equal(20);
      expect(participant5.sum).equal(21);
      expect(participant6.sum).equal(12);
      expect(participant7.sum).equal(20);
      expect(participant8.sum).equal(21);
      expect(participant9.sum).equal(12);
    });
  });
  describe("isBlackjackゲッター", () => {
    describe("正常系", () => {
      it("handの数字の合計が21かつhandの要素数が2のときtrueを返す。", () => {
        expect(participant5.isBlackjack).equal(true);
      });
    });
    describe("異常系", () => {
      it("それ以外のときはfalseを返す。", () => {
        expect(participant7.isBlackjack).equal(false);
        expect(participant1.isBlackjack).equal(false);
        expect(participant8.isBlackjack).equal(false);
      });
    });
  });
  describe("isBustedゲッター", () => {
    describe("正常系", () => {
      it("handの数字の合計が21より大きいときtrueを返す。", () => {
        expect(participant10.isBusted).equal(true);
      });
    });
    describe("異常系", () => {
      it("それ以外のときはfalseを返す。", () => {
        expect(participant4.isBusted).equal(false);
        expect(participant5.isBusted).equal(false);
      });
    });
  });
  describe("deal()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。これを2回行う。", () => {
      participant1.hand = [];
      participant1.deal();
      expect(participant1.hand).deep.equal([
        new Card(String.fromCodePoint(0x2663), 10, "K"),
        new Card(String.fromCodePoint(0x2663), 10, "Q"),
      ]);
    });
  });
  describe("hit()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。", () => {
      participant2.hit();
      expect(participant2.hand).deep.equal([
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
        new Card(String.fromCodePoint(0x2663), 10, "K"),
      ]);
    });
  });
});
