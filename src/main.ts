import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

import { Deck } from "./types/Deck";
import { displayHand } from "./modules/displayHand";
import { setBet } from "./modules/setBet";

const deck: Deck[] = [];
let shuffledDeck: Deck[];
let dealersHand: Deck[] = [];
let playersHand: Deck[] = [];
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
};

const shuffleDeck = () => {
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

const firstDeal = async () => {
  dealersHand.push(shuffledDeck.pop());
  dealersHand.push(shuffledDeck.pop());
  dealersHand[1].isOpen = false;
  playersHand.push(shuffledDeck.pop());
  playersHand.push(shuffledDeck.pop());
};

const checkPlayersHand = async () => {
  const handNum = playersHand.map((card) => card.number);
  playersSum = handNum.reduce((a, b) => a + b);
  if (handNum.length === 2 && playersSum === 21) {
    await checkResult();
    return;
  }
  if (playersSum > 21 && handNum.includes(11)) {
    playersSum -= handNum.filter((num) => num === 11).length * 10;
  }
  if (playersSum < 21) {
    await selectAction();
  } else {
    await checkResult();
  }
};

const checkDealersHand = () => {
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
  checkDealersHand();
  const handNum = playersHand.map((card) => card.number);
  playersSum = handNum.reduce((a, b) => a + b);
  if (handNum.length === 2 && playersSum === 21) {
    console.log(colors.rainbow("B L A C K J A C K"));
    money += 2.5 * bet;
    console.log(colors.bold.red("You Win!!"));
    console.log(colors.bold.red("You won ") + colors.bold.red(`$${1.5 * bet}`));
    console.log(
      colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
    );
  }
  if (dealersSum <= 21 && playersSum <= 21) {
    if (dealersSum === playersSum) {
      console.log(colors.bold("Draw"));
      money += bet;
      console.log(
        colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
      );
    } else if (dealersSum > playersSum) {
      console.log(colors.bold.blue("You Lose"));
      console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
      console.log(
        colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
      );
    } else {
      money += 2 * bet;
      console.log(colors.bold.red("You Win!!"));
      console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
      console.log(
        colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
      );
    }
  } else {
    if (dealersSum > 21) {
      console.log(colors.bold.red("Dealer Burst"));
      money += 2 * bet;
      console.log(colors.bold.red("You Win!!"));
      console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
      console.log(
        colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
      );
    } else if (playersSum > 21) {
      console.log(colors.bold.blue("You Burst"));
      console.log(colors.bold.blue("You Lose"));
      console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
      console.log(
        colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
      );
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
    await checkPlayersHand();
  } else if (action === "d") {
    if (money - bet < 0) {
      console.log(
        colors.bold("You can not double down. You have enough money.")
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
    checkResult();
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
  bet = await setBet(money);
  money -= bet;
  await firstDeal();
  await displayHand(dealersHand, playersHand);
  await checkPlayersHand();
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
