import colors from "colors";

import { Card, cardSymbols } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";
import { Participant } from "../../src/classes/Participant";

import { printLine } from "../../src/utils/printLine";

jest.mock("../../src/utils/printLine");
jest.mock("../../src/classes/Card");
jest.mock("../../src/classes/Deck");

const mockPrintLine = printLine as jest.Mock;
const MockCard = Card as jest.Mock;
const MockDeck = Deck as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("Participantクラス", () => {
  describe("deckゲッター", () => {
    it("deckを返す", () => {
      const participant1 = new Participant(new MockDeck());

      expect(participant1.deck).toBeInstanceOf(MockDeck);
    });
  });

  describe("deckセッター", () => {
    it("deckをセットする", () => {
      const participant1 = new Participant(new MockDeck());
      participant1.deck = new MockDeck();

      expect(participant1.deck).toBeInstanceOf(MockDeck);
    });
  });

  describe("handゲッター", () => {
    it("handを返す", () => {
      const mockCard1 = new MockCard();
      const mockCard2 = new MockCard();
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      expect(participant1.hand).toEqual([mockCard1, mockCard2]);
    });
  });

  describe("handセッター", () => {
    it("handをセットする。", () => {
      const mockCard1 = new MockCard();
      const mockCard2 = new MockCard();
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      expect(participant1.hand).toEqual([mockCard1, mockCard2]);
    });
  });

  describe("sumゲッター", () => {
    it("handにエースが含まれないときは数字の合計をそのまま返す", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(2);
      const mockCard2 = new MockCard(8);
      const mockCard3 = new MockCard(9);
      const participant1 = new Participant(new MockDeck());
      const participant2 = new Participant(new MockDeck());
      const participant3 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];
      participant2.hand = [mockCard1, mockCard3];
      participant3.hand = [mockCard2, mockCard3];

      expect(participant1.sum).toBe(10);
      expect(participant2.sum).toBe(11);
      expect(participant3.sum).toBe(17);
    });
    it("handにエースが1枚含まれるかつ数字の合計が11以下のとき、エースの数字は11として再計算される", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(10);
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      expect(participant1.sum).toBe(21);
    });
    it("handにエースが1枚含まれるかつ数字の合計が12以上のとき、数字の合計をそのまま返す", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(2);
      const mockCard3 = new MockCard(9);
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2, mockCard3];

      expect(participant1.sum).toBe(12);
    });
    it("handにエースが複数枚含まれるかつ数字の合計が11以下のとき、エースを1枚選択しその数字を11に変更して合計を再計算する。これは数字の合計が12以上になるまで繰り返される", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(3);
      const mockCard3 = new MockCard(6);
      const mockCard4 = new MockCard(7);
      const mockCard5 = new MockCard(8);
      const participant1 = new Participant(new MockDeck());
      const participant2 = new Participant(new MockDeck());
      const participant3 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard1, mockCard5];
      participant2.hand = [mockCard1, mockCard1, mockCard2, mockCard3];
      participant3.hand = [mockCard1, mockCard1, mockCard3, mockCard4];

      expect(participant1.sum).toBe(20);
      expect(participant2.sum).toBe(21);
      expect(participant3.sum).toBe(15);
    });
  });

  describe("isBlackjackゲッター", () => {
    it("handの数字の合計が21かつhandの要素数が2のときtrueを返す。", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(10);
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      expect(participant1.isBlackjack).toBe(true);
    });

    it("それ以外のときはfalseを返す。", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(3);
      const mockCard3 = new MockCard(6);
      const mockCard4 = new MockCard(7);
      const mockCard5 = new MockCard(9);
      const participant1 = new Participant(new MockDeck());
      const participant2 = new Participant(new MockDeck());
      participant1.hand = [mockCard4, mockCard5];
      participant2.hand = [mockCard1, mockCard1, mockCard2, mockCard3];

      expect(participant1.isBlackjack).toBe(false);
      expect(participant2.isBlackjack).toBe(false);
    });
  });

  describe("isBustedゲッターはhandがバストの条件を返すならtrueを、満たさないならfalseを返す", () => {
    it("handの数字の合計が21より大きいときtrueを返す。", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(5);
      const mockCard2 = new MockCard(7);
      const mockCard3 = new MockCard(10);
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2, mockCard3];

      expect(participant1.isBusted).toBe(true);
    });
    it("それ以外のときはfalseを返す。", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(7);
      const mockCard3 = new MockCard(9);
      const mockCard4 = new MockCard(10);
      const participant1 = new Participant(new MockDeck());
      const participant2 = new Participant(new MockDeck());
      participant1.hand = [mockCard2, mockCard3];
      participant2.hand = [mockCard1, mockCard4];

      expect(participant1.isBusted).toBe(false);
      expect(participant2.isBusted).toBe(false);
    });
  });

  describe("deal()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。これを2回行う。", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(2);
      const mockCard3 = new MockCard(3);
      MockDeck.mockImplementation(() => {
        return {
          draw: jest
            .fn()
            .mockReturnValueOnce(mockCard2)
            .mockReturnValueOnce(mockCard3),
        };
      });
      const mockDeck = new MockDeck();
      const participant1 = new Participant(mockDeck);
      participant1.hand = [mockCard1];

      participant1.deal();
      expect(mockDeck.draw).toHaveBeenCalledTimes(2);
      expect(participant1.hand).toEqual([mockCard1, mockCard2, mockCard3]);
    });
  });

  describe("hit()メソッド", () => {
    it("deck.draw()の返り値をhandにpush()する。", () => {
      MockCard.mockImplementation((number) => {
        return {
          number,
        };
      });
      const mockCard1 = new MockCard(1);
      const mockCard2 = new MockCard(2);
      MockDeck.mockImplementation(() => {
        return {
          draw: jest.fn().mockReturnValueOnce(mockCard2),
        };
      });
      const mockDeck = new MockDeck();
      const participant1 = new Participant(mockDeck);
      participant1.hand = [mockCard1];

      participant1.hit();
      expect(mockDeck.draw).toHaveBeenCalledTimes(1);
      expect(participant1.hand).toEqual([mockCard1, mockCard2]);
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
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      participant1.renderHand("");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.black.bgWhite(` ${cardSymbols.get("club")} A `) +
          "  " +
          colors.black.bgWhite(` ${cardSymbols.get("spade")} 2 `) +
          "  " +
          "\n"
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
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      participant1.renderHand("prefix");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold("prefix") +
          colors.red.bgWhite(` ${cardSymbols.get("heart")} J `) +
          "  " +
          colors.red.bgWhite(` ${cardSymbols.get("diamond")} Q `) +
          "  " +
          "\n"
      );
    });
  });

  describe("renderNewCard()メソッド", () => {
    it("handの最後の要素に応じた文字列を生成し、その文字列を引数にしてprintLine関数を呼び出す。手札に黒の絵札が含まれるとき", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("club"), 1, "A");
      const mockCard2 = new MockCard(cardSymbols.get("spade"), 2, "2");
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      participant1.renderNewCard("");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.black.bgWhite(` ${cardSymbols.get("spade")} 2 `) + "\n"
      );
    });
    it("handの最後の要素に応じた文字列を生成し、その文字列を引数にしてprintLine関数を呼び出す。手札に赤の絵札が含まれるとき", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("heart"), 10, "J");
      const mockCard2 = new MockCard(cardSymbols.get("diamond"), 10, "Q");
      const participant1 = new Participant(new MockDeck());
      participant1.hand = [mockCard1, mockCard2];

      participant1.renderNewCard("prefix");
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold("prefix") +
          colors.red.bgWhite(` ${cardSymbols.get("diamond")} Q `) +
          "\n"
      );
    });
  });
});
