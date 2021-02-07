import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "./types/Card";
import { checkPlayersHand } from "./modules/checkPlayersHand";
import { clearResult } from "./modules/clearResult";
import { createDeck } from "./modules/createDeck";
import { displayHand } from "./modules/displayHand";
import { displayMoney } from "./modules/displayMoney";
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

const initCreateDeck = async () => {
  deck = await createDeck(deck);
};

const initGame = async () => {
  while (money !== 0) {
    ({
      dealersHand,
      playersHand,
      dealersSum,
      playersSum,
      bet,
    } = await clearResult(
      dealersHand,
      playersHand,
      dealersSum,
      playersSum,
      bet
    ));
    shuffledDeck = await shuffleDeck(deck);
    await displayMoney(money);
    ({ bet, money } = await setBet(bet, money));
    ({ shuffledDeck, dealersHand, playersHand } = await firstDeal(
      shuffledDeck,
      dealersHand,
      playersHand
    ));
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
