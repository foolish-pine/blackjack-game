import { Card } from "../types/Card";

export const clearResult = async (
  dealersHand: Card[],
  playersHand: Card[],
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number
): Promise<{
  dealersHand: Card[];
  playersHand: Card[];
  dealersSum: number;
  playersSum: number;
  money: number;
  bet: number;
}> => {
  dealersHand = [];
  playersHand = [];
  dealersSum = 0;
  playersSum = 0;
  money = 1000;
  bet = 0;
  return { dealersHand, playersHand, dealersSum, playersSum, money, bet };
};
