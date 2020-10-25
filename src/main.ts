import figlet from "figlet";
import readlineSync from "readline-sync";
import colors from "colors";

type Deck = {
  id: number;
  number: number;
  rank: number | string;
  symbol: string;
  isOpen: boolean;
};

const deck: Deck[] = [];
let shuffledDeck: Deck[];
let dealersHand: Deck[] = [];
let playersHand: Deck[] = [];
let dealersSum = 0;
let playersSum = 0;
let playersWin = 0;
let playersLose = 0;
let playersDraw = 0;

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

const clearResult = () => {
  dealersHand = [];
  playersHand = [];
  dealersSum = 0;
  playersSum = 0;
};

const firstDeal = () => {
  dealersHand.push(shuffledDeck.pop());
  dealersHand.push(shuffledDeck.pop());
  dealersHand[1].isOpen = false;
  playersHand.push(shuffledDeck.pop());
  playersHand.push(shuffledDeck.pop());
};

const displayHand = () => {
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

const checkPlayersHand = () => {
  const handNum = playersHand.map((card) => card.number);
  playersSum = handNum.reduce((a, b) => a + b);
  if (handNum.length === 2 && playersSum === 21) {
    console.log(colors.rainbow("B L A C K J A C K"));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    checkResult();
    return;
  }
  if (playersSum > 21 && handNum.includes(11)) {
    playersSum -= handNum.filter((num) => num === 11).length * 10;
    return;
  }
  if (playersSum < 21) {
    selectAction();
  } else {
    checkResult();
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
    displayHand();
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
    displayHand();
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    checkDealersHand();
  }
};

const checkResult = () => {
  checkDealersHand();
  if (dealersSum <= 21 && playersSum <= 21) {
    if (dealersSum === playersSum) {
      console.log(colors.bold("Draw"));
      playersDraw++;
    } else if (dealersSum > playersSum) {
      console.log(colors.bold.blue("You Lose"));
      playersLose++;
    } else {
      console.log(colors.bold.red("You Win!!"));
      playersWin++;
    }
  } else {
    if (dealersSum > 21) {
      console.log(colors.bold.red("Dealer Burst"));
      console.log(colors.bold.red("You Win!!"));
      playersWin++;
    } else if (playersSum > 21) {
      console.log(colors.bold.blue("You Burst"));
      console.log(colors.bold.blue("You Lose"));
      playersLose++;
    }
  }
  console.log(
    colors.bold("Your score: ") +
      colors.bold.red(`${playersWin} Win`) +
      colors.bold(" / ") +
      colors.bold.blue(`${playersLose} Lose`) +
      colors.bold(" / ") +
      colors.bold(`${playersDraw} Draw`)
  );
  console.log(colors.bold("Please Enter to start next game"));
  readlineSync.question(colors.bold("(Enter)"));
  console.log("");
  startGame();
};

const selectAction = () => {
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
    displayHand();
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    checkPlayersHand();
  } else if (action === "d") {
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
    displayHand();
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    checkPlayersHand();
  } else if (action === "s") {
    checkResult();
  } else {
    console.log(
      colors.bold("Please input Hit[h] or DoubleDown[d] or Stand[s]")
    );
    selectAction();
  }
};

const startGame = () => {
  clearResult();
  shuffleDeck();
  firstDeal();
  displayHand();
  checkPlayersHand();
  selectAction();
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
startGame();
