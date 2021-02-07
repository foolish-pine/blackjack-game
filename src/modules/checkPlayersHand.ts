import { calcSum } from "./calcSum";
import { displayHand } from "./displayHand";
import { checkResult } from "./checkResult";
import { displayDealersSecondCard } from "./displayDealersSecondCard";
import { selectAction } from "./selectAction";

import { Card } from "../types/Card";

export const checkPlayersHand = async (
  shuffledDeck: Card[],
  dealersHand: Card[],
  playersHand: Card[],
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number
): Promise<number> => {
  const dealersHandNum = dealersHand.map((card) => card.number);
  const playersHandNum = playersHand.map((card) => card.number);
  const dealersHandNumLength = dealersHand.map((card) => card.number).length;
  const playersHandNumLength = playersHand.map((card) => card.number).length;
  dealersSum = await calcSum(dealersHandNum);
  playersSum = await calcSum(playersHandNum);
  if (playersSum > 21) {
    money = await checkResult(
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet
    );
  } else if (playersSum === 21) {
    await displayDealersSecondCard(dealersHand);
    await displayHand(dealersHand, playersHand);
    money = await checkResult(
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet
    );
  } else {
    money = await selectAction(
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersSum,
      playersSum,
      money,
      bet
    );
  }
  return money;
};
