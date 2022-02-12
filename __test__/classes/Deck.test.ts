import { Card } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";

describe("Deckクラス", () => {
  const deck = new Deck();
  const originalCards = [
    new Card(String.fromCodePoint(0x2660), 1, "A"),
    new Card(String.fromCodePoint(0x2660), 2, "2"),
    new Card(String.fromCodePoint(0x2660), 3, "3"),
    new Card(String.fromCodePoint(0x2660), 4, "4"),
    new Card(String.fromCodePoint(0x2660), 5, "5"),
    new Card(String.fromCodePoint(0x2660), 6, "6"),
    new Card(String.fromCodePoint(0x2660), 7, "7"),
    new Card(String.fromCodePoint(0x2660), 8, "8"),
    new Card(String.fromCodePoint(0x2660), 9, "9"),
    new Card(String.fromCodePoint(0x2660), 10, "10"),
    new Card(String.fromCodePoint(0x2660), 10, "J"),
    new Card(String.fromCodePoint(0x2660), 10, "Q"),
    new Card(String.fromCodePoint(0x2660), 10, "K"),
    new Card(String.fromCodePoint(0x2665), 1, "A"),
    new Card(String.fromCodePoint(0x2665), 2, "2"),
    new Card(String.fromCodePoint(0x2665), 3, "3"),
    new Card(String.fromCodePoint(0x2665), 4, "4"),
    new Card(String.fromCodePoint(0x2665), 5, "5"),
    new Card(String.fromCodePoint(0x2665), 6, "6"),
    new Card(String.fromCodePoint(0x2665), 7, "7"),
    new Card(String.fromCodePoint(0x2665), 8, "8"),
    new Card(String.fromCodePoint(0x2665), 9, "9"),
    new Card(String.fromCodePoint(0x2665), 10, "10"),
    new Card(String.fromCodePoint(0x2665), 10, "J"),
    new Card(String.fromCodePoint(0x2665), 10, "Q"),
    new Card(String.fromCodePoint(0x2665), 10, "K"),
    new Card(String.fromCodePoint(0x2666), 1, "A"),
    new Card(String.fromCodePoint(0x2666), 2, "2"),
    new Card(String.fromCodePoint(0x2666), 3, "3"),
    new Card(String.fromCodePoint(0x2666), 4, "4"),
    new Card(String.fromCodePoint(0x2666), 5, "5"),
    new Card(String.fromCodePoint(0x2666), 6, "6"),
    new Card(String.fromCodePoint(0x2666), 7, "7"),
    new Card(String.fromCodePoint(0x2666), 8, "8"),
    new Card(String.fromCodePoint(0x2666), 9, "9"),
    new Card(String.fromCodePoint(0x2666), 10, "10"),
    new Card(String.fromCodePoint(0x2666), 10, "J"),
    new Card(String.fromCodePoint(0x2666), 10, "Q"),
    new Card(String.fromCodePoint(0x2666), 10, "K"),
    new Card(String.fromCodePoint(0x2663), 1, "A"),
    new Card(String.fromCodePoint(0x2663), 2, "2"),
    new Card(String.fromCodePoint(0x2663), 3, "3"),
    new Card(String.fromCodePoint(0x2663), 4, "4"),
    new Card(String.fromCodePoint(0x2663), 5, "5"),
    new Card(String.fromCodePoint(0x2663), 6, "6"),
    new Card(String.fromCodePoint(0x2663), 7, "7"),
    new Card(String.fromCodePoint(0x2663), 8, "8"),
    new Card(String.fromCodePoint(0x2663), 9, "9"),
    new Card(String.fromCodePoint(0x2663), 10, "10"),
    new Card(String.fromCodePoint(0x2663), 10, "J"),
    new Card(String.fromCodePoint(0x2663), 10, "Q"),
    new Card(String.fromCodePoint(0x2663), 10, "K"),
  ];

  describe("cardsゲッター", () => {
    it("cardsはすべての種類のカードを含む", () => {
      expect(deck.cards).toEqual(expect.arrayContaining(originalCards));
      expect(originalCards).toEqual(expect.arrayContaining(deck.cards));
    });
  });

  describe("shuffle()メソッド", () => {
    it("cardsの要素をランダムに入れ替えて返す。実行前と後のcardsは順不同で同一の要素をもつ。", () => {
      const beforeCards = [...deck.cards];
      deck.shuffle();
      const afterCards = [...deck.cards];

      expect(beforeCards).toEqual(expect.arrayContaining(afterCards));
      expect(afterCards).toEqual(expect.arrayContaining(beforeCards));
    });
  });

  describe("draw()メソッド", () => {
    it("cardsの一番最後の要素をひとつpopする", () => {
      const topCard = deck.cards[deck.cards.length - 1];
      expect(deck.draw()).toEqual(topCard);
    });
  });
});
