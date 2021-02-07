import { describe, it } from "mocha";
import { expect } from "chai";

import { createDeck } from "../src/modules/createDeck";

describe("createDeck", () => {
  describe("正常系:", () => {
    it("トランプのデッキを生成して返す", async () => {
      try {
        expect(await createDeck([])).deep.equal([
          { id: 0, number: 11, rank: "A", symbol: "♥", isOpen: true },
          { id: 1, number: 11, rank: "A", symbol: "♦", isOpen: true },
          { id: 2, number: 11, rank: "A", symbol: "♣", isOpen: true },
          { id: 3, number: 11, rank: "A", symbol: "♠", isOpen: true },
          { id: 4, number: 2, rank: 2, symbol: "♥", isOpen: true },
          { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
          { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
          { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
          { id: 8, number: 3, rank: 3, symbol: "♥", isOpen: true },
          { id: 9, number: 3, rank: 3, symbol: "♦", isOpen: true },
          { id: 10, number: 3, rank: 3, symbol: "♣", isOpen: true },
          { id: 11, number: 3, rank: 3, symbol: "♠", isOpen: true },
          { id: 12, number: 4, rank: 4, symbol: "♥", isOpen: true },
          { id: 13, number: 4, rank: 4, symbol: "♦", isOpen: true },
          { id: 14, number: 4, rank: 4, symbol: "♣", isOpen: true },
          { id: 15, number: 4, rank: 4, symbol: "♠", isOpen: true },
          { id: 16, number: 5, rank: 5, symbol: "♥", isOpen: true },
          { id: 17, number: 5, rank: 5, symbol: "♦", isOpen: true },
          { id: 18, number: 5, rank: 5, symbol: "♣", isOpen: true },
          { id: 19, number: 5, rank: 5, symbol: "♠", isOpen: true },
          { id: 20, number: 6, rank: 6, symbol: "♥", isOpen: true },
          { id: 21, number: 6, rank: 6, symbol: "♦", isOpen: true },
          { id: 22, number: 6, rank: 6, symbol: "♣", isOpen: true },
          { id: 23, number: 6, rank: 6, symbol: "♠", isOpen: true },
          { id: 24, number: 7, rank: 7, symbol: "♥", isOpen: true },
          { id: 25, number: 7, rank: 7, symbol: "♦", isOpen: true },
          { id: 26, number: 7, rank: 7, symbol: "♣", isOpen: true },
          { id: 27, number: 7, rank: 7, symbol: "♠", isOpen: true },
          { id: 28, number: 8, rank: 8, symbol: "♥", isOpen: true },
          { id: 29, number: 8, rank: 8, symbol: "♦", isOpen: true },
          { id: 30, number: 8, rank: 8, symbol: "♣", isOpen: true },
          { id: 31, number: 8, rank: 8, symbol: "♠", isOpen: true },
          { id: 32, number: 9, rank: 9, symbol: "♥", isOpen: true },
          { id: 33, number: 9, rank: 9, symbol: "♦", isOpen: true },
          { id: 34, number: 9, rank: 9, symbol: "♣", isOpen: true },
          { id: 35, number: 9, rank: 9, symbol: "♠", isOpen: true },
          { id: 36, number: 10, rank: 10, symbol: "♥", isOpen: true },
          { id: 37, number: 10, rank: 10, symbol: "♦", isOpen: true },
          { id: 38, number: 10, rank: 10, symbol: "♣", isOpen: true },
          { id: 39, number: 10, rank: 10, symbol: "♠", isOpen: true },
          { id: 40, number: 10, rank: "J", symbol: "♥", isOpen: true },
          { id: 41, number: 10, rank: "J", symbol: "♦", isOpen: true },
          { id: 42, number: 10, rank: "J", symbol: "♣", isOpen: true },
          { id: 43, number: 10, rank: "J", symbol: "♠", isOpen: true },
          { id: 44, number: 10, rank: "Q", symbol: "♥", isOpen: true },
          { id: 45, number: 10, rank: "Q", symbol: "♦", isOpen: true },
          { id: 46, number: 10, rank: "Q", symbol: "♣", isOpen: true },
          { id: 47, number: 10, rank: "Q", symbol: "♠", isOpen: true },
          { id: 48, number: 10, rank: "K", symbol: "♥", isOpen: true },
          { id: 49, number: 10, rank: "K", symbol: "♦", isOpen: true },
          { id: 50, number: 10, rank: "K", symbol: "♣", isOpen: true },
          { id: 51, number: 10, rank: "K", symbol: "♠", isOpen: true },
        ]);
      } catch (e) {
        throw e;
      }
    });
  });
});
