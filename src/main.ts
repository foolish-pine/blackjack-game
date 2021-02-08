import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "./types/Card";

import { calcSum } from "./modules/calcSum";
import { checkDealersHand } from "./modules/checkDealersHand";
import { checkResult } from "./modules/checkResult";
import { createDeck } from "./modules/createDeck";
import { displayDealersSecondCard } from "./modules/displayDealersSecondCard";
import { displayHand } from "./modules/displayHand";
import { displayMoney } from "./modules/displayMoney";
import { firstDeal } from "./modules/firstDeal";
import { selectAction } from "./modules/selectAction";
import { setBet } from "./modules/setBet";
import { shuffleDeck } from "./modules/shuffleDeck";

let deck: Card[] = [];
let money = 1000;

const initCreateDeck = async () => {
  deck = await createDeck(deck);
};

const initGame = async () => {
  let dealersHand: Card[] = [];
  let playersHand: Card[] = [];
  let dealersHandNum: number[] = [];
  let playersHandNum: number[] = [];
  let dealersHandNumLength = 0;
  let playersHandNumLength = 0;
  let dealersSum = 0;
  let playersSum = 0;
  let bet = 0;

  let shuffledDeck: Card[] = await shuffleDeck(deck);
  await displayMoney(money);
  ({ bet, money } = await setBet(bet, money));
  ({ shuffledDeck, dealersHand, playersHand } = await firstDeal(
    shuffledDeck,
    dealersHand,
    playersHand
  ));
  dealersHandNum = dealersHand.map((card) => card.number);
  playersHandNum = playersHand.map((card) => card.number);
  dealersHandNumLength = dealersHand.map((card) => card.number).length;
  playersHandNumLength = playersHand.map((card) => card.number).length;
  dealersSum = await calcSum(dealersHandNum);
  playersSum = await calcSum(playersHandNum);
  await displayHand(dealersHand, playersHand);
  let isGameFinished = false;
  let isPlayersTurnFinished = false;
  while (!isGameFinished) {
    if (playersSum > 21) {
      money = await checkResult(
        dealersHandNumLength,
        playersHandNumLength,
        dealersSum,
        playersSum,
        money,
        bet
      );
      isGameFinished = true;
    } else if (playersHandNumLength === 2 && playersSum === 21) {
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
      isGameFinished = true;
    } else if (playersSum === 21) {
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
      isGameFinished = true;
    } else if (isPlayersTurnFinished) {
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
      isGameFinished = true;
    } else {
      ({
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
      } = await selectAction(
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
        isPlayersTurnFinished
      ));
    }
  }
  if (money === 0) {
    console.log(colors.bold("You have no money."));
    console.log(colors.bold("GAME OVER!"));
  } else {
    await displayMoney(money);
    console.log(colors.bold("Please Enter to start next game"));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    initGame();
  }
};

// タイトルのアスキーアート
console.log(
  colors.rainbow(
    figlet.textSync("BLACK JACK", {
      font: "Big Chief",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

console.log(colors.bold("Please Enter to Start"));
readlineSync.question();
initCreateDeck();
initGame();
