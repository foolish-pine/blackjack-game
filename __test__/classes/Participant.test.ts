import { Card } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";
import { Participant } from "../../src/classes/Participant";

describe("Participantクラス", () => {
  describe("deckゲッター", () => {
    it("deckを返す", () => {
      const participant1 = new Participant(new Deck());
      expect(participant1.deck).toBeInstanceOf(Deck);
    });
  });

  describe("deckセッター", () => {
    it("deckをセットする", () => {
      const participant1 = new Participant(new Deck());
      participant1.deck = new Deck();
      expect(participant1.deck).toBeInstanceOf(Deck);
    });
  });

  describe("handゲッター", () => {
    it("handを返す", () => {
      const participant1 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 8, "8"),
      ];
      expect(participant1.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 8, "8"),
      ]);
    });
  });

  describe("handセッター", () => {
    it("handをセットする。", () => {
      const participant1 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      expect(participant1.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ]);
    });
  });

  describe("sumゲッター", () => {
    it("handにエースが含まれないときは数字の合計をそのまま返す", () => {
      const participant1 = new Participant(new Deck());
      const participant2 = new Participant(new Deck());
      const participant3 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 8, "8"),
      ];
      participant2.hand = [
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      participant3.hand = [
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      expect(participant1.sum).toBe(10);
      expect(participant2.sum).toBe(11);
      expect(participant3.sum).toBe(16);
    });
    it("handにエースが1枚含まれるかつ数字の合計が11以下のとき、エースの数字は11として再計算される", () => {
      const participant1 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "10"),
      ];
      expect(participant1.sum).toBe(21);
    });
    it("handにエースが1枚含まれるかつ数字の合計が12以上のとき、数字の合計をそのまま返す", () => {
      const participant1 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      expect(participant1.sum).toBe(12);
    });
    it("handにエースが複数枚含まれるかつ数字の合計が11以下のとき、エースを1枚選択しその数字を11に変更して合計を再計算する。これは数字の合計が12以上になるまで繰り返される", () => {
      const participant1 = new Participant(new Deck());
      const participant2 = new Participant(new Deck());
      const participant3 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 8, "8"),
      ];
      participant2.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 6, "6"),
      ];
      participant3.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 7, "7"),
      ];
      expect(participant1.sum).toBe(20);
      expect(participant2.sum).toBe(21);
      expect(participant3.sum).toBe(12);
    });
  });

  describe("isBlackjackゲッター", () => {
    it("handの数字の合計が21かつhandの要素数が2のときtrueを返す。", () => {
      const participant1 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "10"),
      ];
      expect(participant1.isBlackjack).toBe(true);
    });

    it("それ以外のときはfalseを返す。", () => {
      const participant1 = new Participant(new Deck());
      const participant2 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      participant2.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 6, "6"),
      ];
      expect(participant1.isBlackjack).toBe(false);
      expect(participant2.isBlackjack).toBe(false);
    });
  });

  describe("isBustedゲッターはhandがバストの条件を返すならtrueを、満たさないならfalseを返す", () => {
    it("handの数字の合計が21より大きいときtrueを返す。", () => {
      const participant1 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 5, "5"),
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2660), 10, "J"),
      ];
      expect(participant1.isBusted).toBe(true);
    });
    it("それ以外のときはfalseを返す。", () => {
      const participant1 = new Participant(new Deck());
      const participant2 = new Participant(new Deck());
      participant1.hand = [
        new Card(String.fromCodePoint(0x2660), 7, "7"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      participant2.hand = [
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 10, "10"),
      ];
      expect(participant1.isBusted).toBe(false);
      expect(participant2.isBusted).toBe(false);
    });
  });

  describe("deal()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。これを2回行う。", () => {
      const deck = new Deck();
      const participant1 = new Participant(deck);
      participant1.hand = [new Card(String.fromCodePoint(0x2660), 1, "A")];
      const mockDraw = jest
        .spyOn(deck, "draw")
        .mockReturnValueOnce(new Card(String.fromCodePoint(0x2660), 2, "2"))
        .mockReturnValueOnce(new Card(String.fromCodePoint(0x2660), 3, "3"));

      participant1.deal();
      expect(mockDraw).toHaveBeenCalledTimes(2);
      expect(participant1.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 3, "3"),
      ]);
    });
  });

  describe("hit()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。", () => {
      const deck = new Deck();
      const participant1 = new Participant(deck);
      participant1.hand = [new Card(String.fromCodePoint(0x2660), 1, "A")];
      const mockDraw = jest
        .spyOn(deck, "draw")
        .mockReturnValue(new Card(String.fromCodePoint(0x2660), 2, "2"));

      participant1.hit();
      expect(mockDraw).toHaveBeenCalled;
      expect(participant1.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 1, "A"),
        new Card(String.fromCodePoint(0x2660), 2, "2"),
      ]);
    });
  });
});
