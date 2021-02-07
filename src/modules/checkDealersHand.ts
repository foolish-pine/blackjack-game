import colors from "colors";

import { calcSum } from "./calcSum";
import { displayHand } from "./displayHand";

import { Card } from "../types/Card";

export const checkDealersHand = async (
  shuffledDeck: Card[],
  dealersHand: Card[],
  playersHand: Card[]
): Promise<{ shuffledDeck: Card[]; dealersSum: number }> => {
  let dealersHandNum = dealersHand.map((card) => card.number);
  let dealersSum = await calcSum(dealersHandNum);
  await displayHand(dealersHand, playersHand);
  while (
    (dealersSum === 17 && dealersHandNum.includes(11)) ||
    dealersSum < 17
  ) {
    // ディーラーのハンドの合計が17かつハンドに11が含まれるとき、または17未満のとき、条件を満たさなくなるまで以下を繰り返す
    // ディーラーはヒットする
    dealersHand.push(shuffledDeck.pop());
    // ディーラーが新しく引いたカードを表示する
    let dealer = colors.bold("Dealer's new card: ");
    if (
      dealersHand[dealersHand.length - 1].symbol === "♥" ||
      dealersHand[dealersHand.length - 1].symbol === "♦"
    ) {
      dealer += colors.red.bgWhite(
        ` ${dealersHand[dealersHand.length - 1].symbol} ${
          dealersHand[dealersHand.length - 1].rank
        } `
      );
    } else {
      dealer += colors.black.bgWhite(
        ` ${dealersHand[dealersHand.length - 1].symbol} ${
          dealersHand[dealersHand.length - 1].rank
        } `
      );
    }
    console.log(dealer);
    console.log("");
    displayHand(dealersHand, playersHand);
    dealersHandNum = dealersHand.map((card) => card.number);
    dealersSum = await calcSum(dealersHandNum);
  }
  return { shuffledDeck, dealersSum };
};
