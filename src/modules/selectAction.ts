import readlineSync from "readline-sync";
import colors from "colors";

import { calcSum } from "./calcSum";
import { displayHand } from "./displayHand";
import { displayPlayersNewCard } from "./displayPlayersNewCard";

import { Card } from "../types/Card";

export const selectAction = async (
  shuffledDeck: Card[],
  dealersHand: Card[],
  playersHand: Card[],
  dealersHandNum: number[],
  playersHandNum: number[],
  dealersHandNumLength: number,
  playersHandNumLength: number,
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number,
  isPlayersTurnFinished: boolean
): Promise<{
  shuffledDeck: Card[];
  dealersHand: Card[];
  playersHand: Card[];
  dealersHandNum: number[];
  playersHandNum: number[];
  dealersHandNumLength: number;
  playersHandNumLength: number;
  dealersSum: number;
  playersSum: number;
  money: number;
  bet: number;
  isPlayersTurnFinished: boolean;
}> => {
  const action = readlineSync.question(
    colors.bold("Select Your Action. ") +
      colors.bold.green("Hit[h]") +
      colors.bold(" / ") +
      colors.bold.cyan("DoubleDown[d]") +
      colors.bold(" / ") +
      colors.bold.yellow("Stand[s]") +
      colors.bold(": ")
  );
  console.log("");
  if (action === "h") {
    console.log(colors.bold.green("You hit."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    playersHand.push(shuffledDeck.pop());
    await displayPlayersNewCard(playersHand);
    await displayHand(dealersHand, playersHand);
    return {
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersHandNum,
      playersHandNum,
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet,
      isPlayersTurnFinished,
    };
  } else if (action === "d") {
    if (money - bet < 0) {
      console.log(
        colors.bold("You can't double down. You don't have enough money.")
      );
      return {
        shuffledDeck,
        dealersHand,
        playersHand,
        dealersHandNum,
        playersHandNum,
        dealersHandNumLength,
        playersHandNumLength,
        dealersSum,
        playersSum,
        money,
        bet,
        isPlayersTurnFinished,
      };
    }
    money -= bet;
    bet *= 2;
    isPlayersTurnFinished = true;
    playersHand.push(shuffledDeck.pop());
    console.log(colors.bold.cyan("You doubled down."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    await displayPlayersNewCard(playersHand);
    await displayHand(dealersHand, playersHand);
    dealersHandNum = dealersHand.map((card) => card.number);
    playersHandNum = playersHand.map((card) => card.number);
    dealersHandNumLength = dealersHand.map((card) => card.number).length;
    playersHandNumLength = playersHand.map((card) => card.number).length;
    dealersSum = await calcSum(dealersHandNum);
    playersSum = await calcSum(playersHandNum);
    return {
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersHandNum,
      playersHandNum,
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet,
      isPlayersTurnFinished,
    };
  } else if (action === "s") {
    isPlayersTurnFinished = true;
    console.log(colors.bold.yellow("You stand."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    return {
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersHandNum,
      playersHandNum,
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet,
      isPlayersTurnFinished,
    };
  } else {
    console.log(
      colors.bold("Please input Hit[h] or DoubleDown[d] or Stand[s]")
    );
    return {
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersHandNum,
      playersHandNum,
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet,
      isPlayersTurnFinished,
    };
  }
};
