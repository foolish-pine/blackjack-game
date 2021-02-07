import readlineSync from "readline-sync";
import colors from "colors";

import { calcSum } from "./calcSum";
import { checkDealersHand } from "./checkDealersHand";
import { checkPlayersHand } from "./checkPlayersHand";
import { checkResult } from "./checkResult";
import { displayHand } from "./displayHand";
import { displayPlayersNewCard } from "./displayPlayersNewCard";
import { displayDealersSecondCard } from "./displayDealersSecondCard";

import { Card } from "../types/Card";

export const selectAction = async (
  shuffledDeck: Card[],
  dealersHand: Card[],
  playersHand: Card[],
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number
): Promise<number> => {
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
    money = await checkPlayersHand(
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersSum,
      playersSum,
      money,
      bet
    );
    return money;
  } else if (action === "d") {
    if (money - bet < 0) {
      console.log(
        colors.bold("You can't double down. You don't have enough money.")
      );
      money = await selectAction(
        shuffledDeck,
        dealersHand,
        playersHand,
        dealersSum,
        playersSum,
        money,
        bet
      );
      return money;
    }
    money -= bet;
    bet *= 2;
    playersHand.push(shuffledDeck.pop());
    console.log(colors.bold.cyan("You doubled down."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    await displayPlayersNewCard(playersHand);
    await displayHand(dealersHand, playersHand);
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
    } else {
      await displayDealersSecondCard(dealersHand);
      ({ shuffledDeck, dealersSum } = await checkDealersHand(
        shuffledDeck,
        dealersHand,
        playersHand
      ));
      money = await checkResult(
        dealersHandNumLength,
        playersHandNumLength,
        dealersSum,
        playersSum,
        money,
        bet
      );
    }
    return money;
  } else if (action === "s") {
    console.log(colors.bold.yellow("You stand."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    await displayDealersSecondCard(dealersHand);
    ({ shuffledDeck, dealersSum } = await checkDealersHand(
      shuffledDeck,
      dealersHand,
      playersHand
    ));
    const dealersHandNumLength = dealersHand.map((card) => card.number).length;
    const playersHandNumLength = playersHand.map((card) => card.number).length;
    money = await checkResult(
      dealersHandNumLength,
      playersHandNumLength,
      dealersSum,
      playersSum,
      money,
      bet
    );
    return money;
  } else {
    console.log(
      colors.bold("Please input Hit[h] or DoubleDown[d] or Stand[s]")
    );
    money = await selectAction(
      shuffledDeck,
      dealersHand,
      playersHand,
      dealersSum,
      playersSum,
      money,
      bet
    );
    return money;
  }
};
