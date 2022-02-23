import colors from "colors";

import { Card, cardSymbols } from "../../src/classes/Card";
import { Deck } from "../../src/classes/Deck";
import { Participant } from "../../src/classes/Participant";
import { Dealer } from "../../src/classes/Dealer";

import { printLine } from "../../src/utils/printLine";

jest.mock("../../src/utils/printLine");
jest.mock("../../src/classes/Card");
jest.mock("../../src/classes/Deck");
jest.mock("../../src/classes/Participant");

const mockPrintLine = printLine as jest.Mock;
const MockCard = Card as jest.Mock;
const MockDeck = Deck as jest.Mock;
const MockParticipant = Participant as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("Dealerクラス", () => {
  describe("isSecondCardOpenゲッター", () => {
    it("isSecondCardOpenを返す", () => {
      const dealer = new Dealer(new MockDeck());

      expect(dealer.isSecondCardOpen).toBe(false);
    });
  });

  describe("isSecondCardOpenセッター", () => {
    it("isSecondCardOpenをセットする", () => {
      const dealer = new Dealer(new MockDeck());

      dealer.isSecondCardOpen = true;
      expect(dealer.isSecondCardOpen).toBe(true);
    });
  });

  describe("hasAceゲッター", () => {
    it("handにrankがAのcardが存在するとき、trueを返す", () => {
      MockCard.mockImplementation((rank) => {
        return {
          rank,
        };
      });
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [new MockCard("A"), new MockCard("2")];

      expect(dealer.hasAce).toBe(true);
    });
    it("handにrankがAのcardが存在しないとき、falseを返す", () => {
      MockCard.mockImplementation((rank) => {
        return {
          rank,
        };
      });
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [new MockCard("2")];

      expect(dealer.hasAce).toBe(false);
    });
  });

  describe("clearStatus()メソッド", () => {
    it("handに空配列を、isSecondCardOpenにfalseを代入する。", () => {
      const dealer = new Dealer(new MockDeck());

      dealer.clearStatus();
      expect(dealer.hand).toStrictEqual([]);
      expect(dealer.isSecondCardOpen).toBe(false);
    });
  });

  describe("renderSecondCard()メソッド", () => {
    it("isSecondCardOpenにtrueを代入する。handのインデックス1の要素に応じた文字列を生成し、その文字列を引数にしてprintLine関数を呼び出す。手札に黒の絵札が含まれるとき", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("club"), 1, "A");
      const mockCard2 = new MockCard(cardSymbols.get("spade"), 2, "2");
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [mockCard1, mockCard2];

      dealer.renderSecondCard();
      expect(dealer.isSecondCardOpen).toBe(true);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nDealer's second card: `) +
          colors.black.bgWhite(` ${cardSymbols.get("spade")} 2 `) +
          `\n`
      );
    });
    it("isSecondCardOpenにtrueを代入する。handのインデックス1の要素に応じた文字列を生成し、その文字列を引数にしてprintLine関数を呼び出す。手札に赤の絵札が含まれるとき", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("heart"), 10, "J");
      const mockCard2 = new MockCard(cardSymbols.get("diamond"), 10, "Q");
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [mockCard1, mockCard2];

      dealer.renderSecondCard();
      expect(dealer.isSecondCardOpen).toBe(true);
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nDealer's second card: `) +
          colors.red.bgWhite(` ${cardSymbols.get("diamond")} Q `) +
          `\n`
      );
    });
  });

  describe("renderHand()メソッド", () => {
    it("isSecondCardOpenがtrueのとき、handの要素をすべて表示する", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("club"), 1, "A");
      const mockCard2 = new MockCard(cardSymbols.get("heart"), 2, "2");
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [mockCard1, mockCard2];
      dealer.isSecondCardOpen = true;

      dealer.renderHand();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nDealer: `) +
          colors.black.bgWhite(` ${cardSymbols.get("club")} A `) +
          `  ` +
          colors.red.bgWhite(` ${cardSymbols.get("heart")} 2 `) +
          `  ` +
          `\n`
      );
    });
    it("isSecondCardOpenがfalseのとき、handの最初の要素を表示し、2番目の要素の代わりに???を表示する", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("club"), 1, "A");
      const mockCard2 = new MockCard(cardSymbols.get("spade"), 2, "2");
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [mockCard1, mockCard2];
      dealer.isSecondCardOpen = false;

      dealer.renderHand();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nDealer: `) +
          colors.black.bgWhite(` ${cardSymbols.get("club")} A `) +
          `  ` +
          colors.black.bgWhite(` ??? `) +
          `\n`
      );
    });
    it("isSecondCardOpenがfalseのとき、handの最初の要素を表示し、2番目の要素の代わりに???を表示する", () => {
      MockCard.mockImplementation((symbol, number, rank) => {
        return {
          symbol,
          number,
          rank,
        };
      });
      const mockCard1 = new MockCard(cardSymbols.get("heart"), 1, "A");
      const mockCard2 = new MockCard(cardSymbols.get("spade"), 2, "2");
      const dealer = new Dealer(new MockDeck());
      dealer.hand = [mockCard1, mockCard2];
      dealer.isSecondCardOpen = false;

      dealer.renderHand();
      expect(mockPrintLine).toHaveBeenCalledTimes(1);
      expect(mockPrintLine).toHaveBeenCalledWith(
        colors.bold(`\nDealer: `) +
          colors.red.bgWhite(` ${cardSymbols.get("heart")} A `) +
          `  ` +
          colors.black.bgWhite(` ??? `) +
          `\n`
      );
    });
  });

  describe("renderNewCard()メソッド", () => {
    it("親クラスのrenderNewCard()メソッドを文字列を文字列`\nDealer's new card: `を引数にして呼び出す", () => {
      const renderNewCard = jest.fn();
      MockParticipant.prototype.renderNewCard = renderNewCard;
      const dealer = new Dealer(new MockDeck());

      dealer.renderNewCard();
      expect(renderNewCard).toHaveBeenCalledWith(`\nDealer's new card: `);
    });
  });
});
