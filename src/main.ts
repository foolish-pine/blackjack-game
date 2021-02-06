import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "./types/Card";
import { calcSum } from "./modules/calcSum";
import { clearResult } from "./modules/clearResult";
import { createDeck } from "./modules/createDeck";
import { checkResult } from "./modules/checkResult";
import { displayDealersSecondCard } from "./modules/displayDealersSecondCard";
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

const displayPlayersNewCard = async () => {
  if (
    playersHand[playersHand.length - 1].symbol === "♥" ||
    playersHand[playersHand.length - 1].symbol === "♦"
  ) {
    console.log(
      colors.bold("Your new card: ") +
        colors.red.bgWhite(
          ` ${playersHand[playersHand.length - 1].symbol} ${
            playersHand[playersHand.length - 1].rank
          } `
        )
    );
    console.log("");
  } else {
    console.log(
      colors.bold("Your new card: ") +
        colors.black.bgWhite(
          ` ${playersHand[playersHand.length - 1].symbol} ${
            playersHand[playersHand.length - 1].rank
          } `
        )
    );
    console.log("");
  }
};

const selectAction = async () => {
  const playersHandNum = playersHand.map((card) => card.number);
  const playersHandNumLength = playersHandNum.length;
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
    playersHand.push(shuffledDeck.pop());
    await displayPlayersNewCard();
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
    await displayPlayersNewCard();
    await displayHand(dealersHand, playersHand);
    dealersSum = await checkDealersHand();
    await displayDealersSecondCard(dealersHand);
    await checkResult(playersHandNumLength, playersSum, dealersSum, money, bet);
  } else if (action === "s") {
    await displayDealersSecondCard(dealersHand);
    dealersSum = await checkDealersHand();
    await checkResult(playersHandNumLength, playersSum, dealersSum, money, bet);
  } else {
    console.log(
      colors.bold("Please input Hit[h] or DoubleDown[d] or Stand[s]")
    );
    await selectAction();
  }
};

const checkPlayersHand = async () => {
  const playersHandNum = playersHand.map((card) => card.number);
  const playersHandNumLength = playersHandNum.length;
  playersSum = await calcSum(playersHandNum);
  if (playersSum > 21) {
    await displayDealersSecondCard(dealersHand);
    const dealersHandNum = dealersHand.map((card) => card.number);
    dealersSum = await calcSum(dealersHandNum);
    await checkResult(playersHandNumLength, playersSum, dealersSum, money, bet);
  } else if (playersSum === 21) {
    await displayDealersSecondCard(dealersHand);
    dealersSum = await checkDealersHand();
    await checkResult(playersHandNumLength, playersSum, dealersSum, money, bet);
  } else {
    await selectAction();
  }
};

const checkDealersHand = async () => {
  let dealersHandNum = dealersHand.map((card) => card.number);
  let dealersSum = await calcSum(dealersHandNum);
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
  return dealersSum;
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
    money,
    bet,
  } = await clearResult(
    dealersHand,
    playersHand,
    dealersSum,
    playersSum,
    money,
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
  // await checkPlayersHand();
  // initGame();
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
