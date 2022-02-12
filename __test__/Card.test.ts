import { Card } from "../src/classes/Card";

describe("Cardクラス", () => {
  const card1 = new Card(String.fromCodePoint(0x2660), 1, "A");
  const card2 = new Card(String.fromCodePoint(0x2660), 9, "9");
  const card3 = new Card(String.fromCodePoint(0x2660), 10, "10");
  const card4 = new Card(String.fromCodePoint(0x2665), 11, "J");
  const card5 = new Card(String.fromCodePoint(0x2666), 12, "Q");
  const card6 = new Card(String.fromCodePoint(0x2663), 13, "K");

  describe("symbolゲッター", () => {
    it("カードのシンボルを返す", () => {
      expect(card1.symbol).toBe(String.fromCodePoint(0x2660));
      expect(card2.symbol).toBe(String.fromCodePoint(0x2660));
      expect(card3.symbol).toBe(String.fromCodePoint(0x2660));
      expect(card4.symbol).toBe(String.fromCodePoint(0x2665));
      expect(card5.symbol).toBe(String.fromCodePoint(0x2666));
      expect(card6.symbol).toBe(String.fromCodePoint(0x2663));
    });
  });

  describe("numberゲッター", () => {
    it("カードの数字を返す。数字が11以上の場合は10を返す", () => {
      expect(card1.number).toBe(1);
      expect(card2.number).toBe(9);
      expect(card3.number).toBe(10);
      expect(card4.number).toBe(10);
      expect(card5.number).toBe(10);
      expect(card6.number).toBe(10);
    });
  });

  describe("rankゲッター", () => {
    it("カードのランクを返す", () => {
      expect(card1.rank).toBe("A");
      expect(card2.rank).toBe("9");
      expect(card3.rank).toBe("10");
      expect(card4.rank).toBe("J");
      expect(card5.rank).toBe("Q");
      expect(card6.rank).toBe("K");
    });
  });
});
