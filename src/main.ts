import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "./types/Card";
import { calcSum } from "./modules/calcSum";
import { clearResult } from "./modules/clearResult";
import { createDeck } from "./modules/createDeck";
import { displayMoney } from "./modules/displayMoney";
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

const firstDeal = async () => {
  dealersHand.push(shuffledDeck.pop());
  dealersHand.push(shuffledDeck.pop());
  dealersHand[1].isOpen = false;
  playersHand.push(shuffledDeck.pop());
  playersHand.push(shuffledDeck.pop());
};

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

const displayHand = async (
  dealersHand: Card[],
  playersHand: Card[]
): Promise<void> => {
  let dealer = colors.bold(`Dealer: `);
  let player = colors.bold(`You:    `);
  for (let i = 0; i < dealersHand.length; i++) {
    if (dealersHand[i].isOpen) {
      if (dealersHand[i].symbol === "♥" || dealersHand[i].symbol === "♦") {
        dealer += colors.red.bgWhite(
          ` ${dealersHand[i].symbol} ${dealersHand[i].rank} `
        );
      } else {
        dealer += colors.black.bgWhite(
          ` ${dealersHand[i].symbol} ${dealersHand[i].rank} `
        );
      }
    } else {
      dealer += colors.black.bgWhite(" ??? ");
    }
    dealer += "  ";
  }
  for (let i = 0; i < playersHand.length; i++) {
    if (playersHand[i].symbol === "♥" || playersHand[i].symbol === "♦") {
      player += colors.red.bgWhite(
        ` ${playersHand[i].symbol} ${playersHand[i].rank} `
      );
    } else {
      player += colors.black.bgWhite(
        ` ${playersHand[i].symbol} ${playersHand[i].rank} `
      );
    }
    player += "  ";
  }
  console.log(dealer);
  console.log("");
  console.log(player);
  console.log("");
  readlineSync.question(colors.bold("(Enter)"));
  console.log("");
};

const displayDealersSecondCard = async () => {
  // ディーラーの2枚目のハンドをオープンにして表示する
  dealersHand[1].isOpen = true;
  let dealer = colors.bold("Dealer's second card: ");
  if (dealersHand[1].symbol === "♥" || dealersHand[1].symbol === "♦") {
    dealer += colors.red.bgWhite(
      ` ${dealersHand[1].symbol} ${dealersHand[1].rank} `
    );
  } else {
    dealer += colors.black.bgWhite(
      ` ${dealersHand[1].symbol} ${dealersHand[1].rank} `
    );
  }
  console.log(dealer);
  console.log("");
  // ディーラーとプレイヤーのハンドを表示する
  displayHand(dealersHand, playersHand);
};

const checkResult = async (
  playersHandNumLength: number,
  playersSum: number,
  dealersSum: number
) => {
  if (dealersSum > 21) {
    console.log(colors.bold.red("Dealer Burst"));
    money += 2 * bet;
    console.log(colors.bold.red("You Win!!"));
    console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
    await displayMoney(money);
  } else if (playersSum > 21) {
    console.log(colors.bold.blue("You Burst"));
    console.log(colors.bold.blue("You Lose"));
    console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
    await displayMoney(money);
  }
  if (playersHandNumLength === 2 && playersSum === 21) {
    console.log(colors.rainbow("B L A C K J A C K"));
    money += 2.5 * bet;
    console.log(colors.bold.red("You Win!!"));
    console.log(colors.bold.red("You won ") + colors.bold.red(`$${1.5 * bet}`));
    await displayMoney(money);
  }
  if (dealersSum <= 21 && playersSum <= 21) {
    if (dealersSum === playersSum) {
      console.log(colors.bold("Draw"));
      money += bet;
      await displayMoney(money);
    } else if (dealersSum > playersSum) {
      console.log(colors.bold.blue("You Lose"));
      console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
      await displayMoney(money);
    } else {
      money += 2 * bet;
      console.log(colors.bold.red("You Win!!"));
      console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
      await displayMoney(money);
    }
  }
  if (money === 0) {
    console.log(colors.bold("You have no money."));
    console.log(colors.bold("GAME OVER!"));
    return;
  } else {
    console.log(colors.bold("Please Enter to start next game"));
    readlineSync.question(colors.bold("(Enter)"));
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
    await displayDealersSecondCard();
    await checkResult(playersHandNumLength, playersSum, dealersSum);
  } else if (action === "s") {
    await displayDealersSecondCard();
    dealersSum = await checkDealersHand();
    await checkResult(playersHandNumLength, playersSum, dealersSum);
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
    await displayDealersSecondCard();
    await checkResult(playersHandNumLength, playersSum, dealersSum);
  } else if (playersSum === 21) {
    await displayDealersSecondCard();
    dealersSum = await checkDealersHand();
    await checkResult(playersHandNumLength, playersSum, dealersSum);
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
  await shuffleDeck(deck);
  console.log(await displayMoney(money));
  ({ money, bet } = await setBet(money, bet));
  // await firstDeal();
  // await displayHand(dealersHand, playersHand);
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
