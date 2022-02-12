import { Card } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";
import { Participant } from "../../src/classes/Participant";

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
  participant4.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 10, "10"),
  ];
  participant5.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 2, "2"),
    new Card(String.fromCodePoint(0x2660), 9, "9"),
  ];
  participant6.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 8, "8"),
  ];
  participant7.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 3, "3"),
    new Card(String.fromCodePoint(0x2660), 6, "6"),
  ];
  participant8.hand = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 3, "3"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
  ];
  participant9.hand = [
    new Card(String.fromCodePoint(0x2660), 5, "5"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
    new Card(String.fromCodePoint(0x2660), 10, "J"),
  ];
  participant10.hand = [
    new Card(String.fromCodePoint(0x2660), 5, "5"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
    new Card(String.fromCodePoint(0x2660), 10, "J"),
  ];

  describe("deckゲッター", () => {
    it("deckを返す", () => {
      expect(participant1.deck).toBeInstanceOf(Deck);
    });
  });

  describe("deckセッター", () => {
    it("deckをセットする", () => {
      participant1.deck = new Deck();
      expect(participant1.deck).toBeInstanceOf(Deck);
    });
  });

  describe("handゲッター", () => {
    it("handを返す", () => {
      expect(participant1.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 8, "8"),
      ]);
    });
  });

  describe("handセッター", () => {
    it("handをセットする。", () => {
      participant10.hand = [
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ];
      expect(participant10.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 3, "3"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
      ]);
    });
  });

  describe("sumゲッター", () => {
    it("handにエースが含まれないときは数字の合計をそのまま返す", () => {
      expect(participant1.sum).toBe(10);
      expect(participant2.sum).toBe(11);
      expect(participant3.sum).toBe(16);
    });
    it("handにエースが1枚含まれるかつ数字の合計が11以下のとき、エースの数字は11として再計算される", () => {
      expect(participant4.sum).toBe(21);
    });
    it("handにエースが1枚含まれるかつ数字の合計が12以上のとき、数字の合計をそのまま返す", () => {
      expect(participant5.sum).toBe(12);
    });
    it("handにエースが複数枚含まれるかつ数字の合計が11以下のとき、エースを1枚選択しその数字を11に変更して合計を再計算する。これは数字の合計が12以上になるまで繰り返される", () => {
      expect(participant6.sum).toBe(20);
      expect(participant7.sum).toBe(21);
      expect(participant8.sum).toBe(12);
    });
  });

  describe("isBlackjackゲッター", () => {
    it("handの数字の合計が21かつhandの要素数が2のときtrueを返す。", () => {
      expect(participant4.isBlackjack).toBe(true);
    });

    it("それ以外のときはfalseを返す。", () => {
      expect(participant3.isBlackjack).toBe(false);
      expect(participant7.isBlackjack).toBe(false);
    });
  });

  describe("isBustedゲッターはhandがバストの条件を返すならtrueを、満たさないならfalseを返す", () => {
    it("handの数字の合計が21より大きいときtrueを返す。", () => {
      expect(participant9.isBusted).toBe(true);
    });
    it("それ以外のときはfalseを返す。", () => {
      expect(participant3.isBusted).toBe(false);
      expect(participant4.isBusted).toBe(false);
    });
  });

  describe("deal()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。これを2回行う。", () => {
      const cards = new Deck().cards;
      participant1.hand = [];
      participant1.deal();
      expect(cards).toEqual(expect.arrayContaining(participant1.hand));
    });
  });

  describe("hit()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。", () => {
      const topCard =
        participant2.deck.cards[participant2.deck.cards.length - 1];
      participant2.hit();
      expect(participant2.hand).toEqual([
        new Card(String.fromCodePoint(0x2660), 2, "2"),
        new Card(String.fromCodePoint(0x2660), 9, "9"),
        topCard,
      ]);
    });
  });
});
