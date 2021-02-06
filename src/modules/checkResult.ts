import readlineSync from "readline-sync";
import colors from "colors";

import { displayMoney } from "./displayMoney";

export const checkResult = async (
  playersHandNumLength: number,
  playersSum: number,
  dealersSum: number,
  money: number,
  bet: number
): Promise<number> => {
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
  if (playersHandNumLength !== 2) {
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
  return money;
};
