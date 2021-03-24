import { describe, it } from "mocha";
import { expect } from "chai";

import { Card } from "./../src/classes/Card";

describe("Cardクラス", () => {
  const card1 = new Card(String.fromCodePoint(0x2660), 1, "A");
  const card2 = new Card(String.fromCodePoint(0x2660), 8, "8");
  const card3 = new Card(String.fromCodePoint(0x2665), 11, "J");
  const card4 = new Card(String.fromCodePoint(0x2666), 12, "Q");
  const card5 = new Card(String.fromCodePoint(0x2663), 13, "K");
  describe("symbolゲッター", () => {
    it("カードのシンボルを返す。", () => {
      expect(card1.symbol).equal(String.fromCodePoint(0x2660));
      expect(card2.symbol).equal(String.fromCodePoint(0x2660));
      expect(card3.symbol).equal(String.fromCodePoint(0x2665));
      expect(card4.symbol).equal(String.fromCodePoint(0x2666));
      expect(card5.symbol).equal(String.fromCodePoint(0x2663));
    });
  });
  describe("numberゲッター", () => {
    it("カードの数字を返す。数字が11以上の場合は10を返す。", () => {
      expect(card1.number).equal(1);
      expect(card2.number).equal(8);
      expect(card3.number).equal(10);
      expect(card4.number).equal(10);
      expect(card5.number).equal(10);
    });
  });
  describe("rankゲッター", () => {
    it("カードのランクを返す。", () => {
      expect(card1.rank).equal("A");
      expect(card2.rank).equal("8");
      expect(card3.rank).equal("J");
      expect(card4.rank).equal("Q");
      expect(card5.rank).equal("K");
    });
  });
});
