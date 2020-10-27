import readlineSync from "readline-sync";
import colors from "colors";

import { displayMoney } from "./displayMoney";

export const setBet = async (money: number): Promise<number> => {
  displayMoney(money);
  const input = readlineSync.question(colors.bold("Set Your Bet: "));
  if (
    isNaN(Number(input)) ||
    !Number.isInteger(Number(input)) ||
    Number(input) <= 0
  ) {
    console.log("");
    console.log(colors.bold("Please input a positive integer"));
    setBet(money);
  } else if (Number(input) > money) {
    console.log("");
    console.log(colors.bold("Please bet an amount of money you can."));
    setBet(money);
  } else {
    const bet = Number(input);
    console.log(
      colors.bold.yellow("Your bet: ") + colors.bold.yellow(`$${bet}`)
    );
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    return bet;
  }
};