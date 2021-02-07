import { describe, it } from "mocha";
import { expect } from "chai";

import { clearResult } from "../src/modules/clearResult";

describe("clearResult", () => {
  describe("正常系:", () => {
    it("{ dealersHand: [], playersHand: [], dealersSum: 0, playersSum: 0, money: 1000, bet: 0 }を返す", async () => {
      try {
        expect(
          await clearResult(
            [
              { id: 24, number: 12, rank: "Q", symbol: "♥", isOpen: true },
              { id: 5, number: 11, rank: "A", symbol: "♦", isOpen: false },
            ],
            [
              { id: 37, number: 7, rank: 7, symbol: "♣", isOpen: true },
              { id: 17, number: 2, rank: 2, symbol: "♠", isOpen: false },
              { id: 23, number: 4, rank: 4, symbol: "♠", isOpen: false },
            ],
            15,
            21,
            20
          )
        ).deep.equal({
          dealersHand: [],
          playersHand: [],
          dealersSum: 0,
          playersSum: 0,
          bet: 0,
        });
      } catch (e) {
        throw e;
      }
    });
  });
});
