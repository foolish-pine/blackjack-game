import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "./types/Card";
import { calcSum } from "./modules/calcSum";
import { checkDealersHand } from "./modules/checkDealersHand";
import { clearResult } from "./modules/clearResult";
import { createDeck } from "./modules/createDeck";
import { checkResult } from "./modules/checkResult";
import { displayDealersSecondCard } from "./modules/displayDealersSecondCard";
import { displayHand } from "./modules/displayHand";
import { displayMoney } from "./modules/displayMoney";
import { displayPlayersNewCard } from "./modules/displayPlayersNewCard";
import { firstDeal } from "./modules/firstDeal";
import { setBet } from "./modules/setBet";
import { shuffleDeck } from "./modules/shuffleDeck";

let deck: Card[] = [];
let shuffledDeck: Card[];
let dealersHand: Card[] = [];
let playersHand: Card[] = [];
let dealersSum = 0;
let playersSum = 0;
let money = 1000;
let bet = 0;

const selectAction = async () => {
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
    console.log(colors.bold.cyan("You hit."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    playersHand.push(shuffledDeck.pop());
    await displayPlayersNewCard(playersHand);
    await displayHand(dealersHand, playersHand);
    await checkPlayersHand();
  } else if (action === "d") {
    if (money - bet < 0) {
      console.log(
        colors.bold("You can't double down. You don't have enough money.")
      );
      selectAction();
      return;
    }
    money -= bet;
    bet *= 2;
    playersHand.push(shuffledDeck.pop());
    console.log(colors.bold.cyan("You doubled down."));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    await displayPlayersNewCard(playersHand);
    await displayHand(dealersHand, playersHand);
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
  } else {
    console.log(
      colors.bold("Please input Hit[h] or DoubleDown[d] or Stand[s]")
    );
    await selectAction();
  }
};

const checkPlayersHand = async () => {
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
  } else {
    await selectAction();
  }
};

const initCreateDeck = async () => {
  deck = await createDeck(deck);
};

const initGame = async () => {
  ({
    dealersHand,
    playersHand,
    dealersSum,
    playersSum,
    bet,
  } = await clearResult(dealersHand, playersHand, dealersSum, playersSum, bet));
  shuffledDeck = await shuffleDeck(deck);
  await displayMoney(money);
  ({ bet, money } = await setBet(bet, money));
  ({ shuffledDeck, dealersHand, playersHand } = await firstDeal(
    shuffledDeck,
    dealersHand,
    playersHand
  ));
  await displayHand(dealersHand, playersHand);
  await checkPlayersHand();
  if (money === 0) return;
  initGame();
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
