import { describe, it } from "mocha";
import { expect } from "chai";

import { calcSum } from "../src/modules/calcSum";

import { Card } from "../src/types/Card";

const checkDealersHand = async (
  shuffledDeck: Card[],
  dealersHand: Card[]
): Promise<{ shuffledDeck: Card[]; dealersSum: number }> => {
  let dealersHandNum = dealersHand.map((card) => card.number);
  let dealersSum = await calcSum(dealersHandNum);
  while (
    (dealersSum === 17 && dealersHandNum.includes(11)) ||
    dealersSum < 17
  ) {
    // ディーラーの手札の合計が17かつ手札に11が含まれるとき、または17未満のとき、条件を満たさなくなるまで以下を繰り返す
    // ディーラーはヒットする
    dealersHand.push(shuffledDeck.pop());
    dealersHandNum = dealersHand.map((card) => card.number);
    dealersSum = await calcSum(dealersHandNum);
  }
  return { shuffledDeck, dealersSum };
};

describe("checkDealersHand", () => {
  describe("正常系", () => {
    it("ディーラーの手札の合計が18以上のとき、山札の配列とディーラーの手札の合計を返す", async () => {
      try {
        expect(
          await checkDealersHand(
            [
              { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
              { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
              { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
            ],
            [
              { id: 28, number: 8, rank: 8, symbol: "♥", isOpen: true },
              { id: 36, number: 10, rank: 10, symbol: "♥", isOpen: true },
            ]
          )
        ).deep.equal({
          shuffledDeck: [
            { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
            { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
            { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
          ],
          dealersSum: 18,
        });
        expect(
          await checkDealersHand(
            [
              { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
              { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
              { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
            ],
            [
              { id: 0, number: 11, rank: "A", symbol: "♥", isOpen: true },
              { id: 36, number: 10, rank: 10, symbol: "♥", isOpen: true },
            ]
          )
        ).deep.equal({
          shuffledDeck: [
            { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
            { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
            { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
          ],
          dealersSum: 21,
        });
        expect(
          await checkDealersHand(
            [
              { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
              { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
              { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
            ],
            [
              { id: 42, number: 10, rank: "J", symbol: "♣", isOpen: true },
              { id: 43, number: 10, rank: "J", symbol: "♠", isOpen: true },
              { id: 44, number: 10, rank: "Q", symbol: "♥", isOpen: true },
            ]
          )
        ).deep.equal({
          shuffledDeck: [
            { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
            { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
            { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
          ],
          dealersSum: 30,
        });
      } catch (e) {
        throw e;
      }
    });
    it("ディーラーの手札の合計が17未満のとき、山札の配列の最後の要素をとディーラーの手札の合計を返す", async () => {
      try {
        expect(
          await checkDealersHand(
            [
              { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
              { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
              { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
            ],
            [
              { id: 42, number: 10, rank: "J", symbol: "♣", isOpen: true },
              { id: 43, number: 10, rank: "J", symbol: "♠", isOpen: true },
              { id: 44, number: 10, rank: "Q", symbol: "♥", isOpen: true },
            ]
          )
        ).deep.equal({
          shuffledDeck: [
            { id: 5, number: 2, rank: 2, symbol: "♦", isOpen: true },
            { id: 6, number: 2, rank: 2, symbol: "♣", isOpen: true },
            { id: 7, number: 2, rank: 2, symbol: "♠", isOpen: true },
          ],
          dealersSum: 30,
        });
      } catch (e) {
        throw e;
      }
    });
  });
});
