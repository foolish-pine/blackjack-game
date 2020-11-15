import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "./types/Card";
import { checkBetFormat } from "./modules/checkBetFormat";
import { checkPlayersHand } from "./modules/checkPlayersHand";

const deck: Card[] = [];
let shuffledDeck: Card[];
let dealersHand: Card[] = [];
let playersHand: Card[] = [];
let dealersSum = 0;
let playersSum = 0;
let money = 1000;
let bet = 0;

const createDeck = () => {
  let id = 0;
  const symbols = ["♥", "♦", "♣", "♠"];
  for (let i = 1; i < 14; i++) {
    for (let j = 0; j < symbols.length; j++) {
      let rank: string | number;
      if (i === 1) {
        rank = "A";
      } else if (i === 11) {
        rank = "J";
      } else if (i === 12) {
        rank = "Q";
      } else if (i === 13) {
        rank = "K";
      } else {
        rank = i;
      }
      let number = i;
      if (i === 1) {
        number = 11;
      } else if (i > 10) {
        number = 10;
      }
      const card = {
        id: id,
        number: number,
        rank: rank,
        symbol: symbols[j],
        isOpen: true,
      };
      deck.push(card);
      id++;
    }
  }
};

const clearResult = async () => {
  dealersHand = [];
  playersHand = [];
  dealersSum = 0;
  playersSum = 0;
  bet = 0;
};

const shuffleDeck = async () => {
  shuffledDeck = [...deck];
  // デッキをシャッフルする;
  const cardNum = shuffledDeck.length;
  for (let i = cardNum - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[i],
    ];
  }
};

const displayMoney = async (money: number) => {
  console.log(
    colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
  );
};

const setBet = async () => {
  do {
    try {
      const input = readlineSync.question(colors.bold("Set Your Bet: "));
      bet = checkBetFormat(money, input);
      console.log(
        colors.bold.yellow("Your bet: ") + colors.bold.yellow(`$${bet}`)
      );
      readlineSync.question(colors.bold("(Enter)"));
      console.log("");
    } catch (error) {
      console.log(error.message);
    }
  } while (bet === 0);
};

const firstDeal = async () => {
  dealersHand.push(shuffledDeck.pop());
  dealersHand.push(shuffledDeck.pop());
  dealersHand[1].isOpen = false;
  playersHand.push(shuffledDeck.pop());
  playersHand.push(shuffledDeck.pop());
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
};

const progressGame = async () => {
  const playersHandNum = playersHand.map((card) => card.number);
  switch (checkPlayersHand(playersHandNum)) {
    case "result":
      await checkDealersHand();
      await checkResult();
    case "selectable":
      selectAction();
  }
};

const checkDealersHand = async () => {
  const handNum = dealersHand.map((card) => card.number);
  dealersSum = handNum.reduce((a, b) => a + b);
  if (handNum.length === 2) {
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
    displayHand(dealersHand, playersHand);
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    if (playersSum > 21) return;
  }
  if (dealersSum > 21 && handNum.includes(11)) {
    dealersSum -= handNum.filter((num) => num === 11).length * 10;
  } else if (dealersSum > 21 && !handNum.includes(11)) {
    return;
  }
  if (dealersSum > 17 || (dealersSum === 17 && !handNum.includes(11))) {
    return;
  } else if ((dealersSum === 17 && handNum.includes(11)) || dealersSum < 17) {
    dealersHand.push(shuffledDeck.pop());
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
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    checkDealersHand();
  }
};

const checkResult = async () => {
  const handNum = playersHand.map((card) => card.number);
  playersSum = handNum.reduce((a, b) => a + b);
  if (handNum.length === 2 && playersSum === 21) {
    console.log(colors.rainbow("B L A C K J A C K"));
    money += 2.5 * bet;
    console.log(colors.bold.red("You Win!!"));
    console.log(colors.bold.red("You won ") + colors.bold.red(`$${1.5 * bet}`));
    await displayMoney(money);
    return;
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
  } else {
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
  }
  console.log(colors.bold("Please Enter to start next game"));
  readlineSync.question(colors.bold("(Enter)"));
  console.log("");
};

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
    playersHand.push(shuffledDeck.pop());
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
    await displayHand(dealersHand, playersHand);
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    // await checkPlayersHand();
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
    await displayHand(dealersHand, playersHand);
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    await checkResult();
  } else if (action === "s") {
    await checkDealersHand();
    await checkResult();
  } else {
    console.log(
      colors.bold("Please input Hit[h] or DoubleDown[d] or Stand[s]")
    );
    await selectAction();
  }
};

const initGame = async () => {
  await clearResult();
  await shuffleDeck();
  await displayMoney(money);
  await setBet();
  await firstDeal();
  await displayHand(dealersHand, playersHand);
  await progressGame();

  // await checkPlayersHand();
  if (money === 0) {
    console.log(colors.bold("You have no money."));
    console.log(colors.bold("GAME OVER!"));
    return;
  }
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
createDeck();
initGame();
