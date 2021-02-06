import readlineSync from "readline-sync";
import colors from "colors";

import { checkBetFormat } from "./../modules/checkBetFormat";

export const setBet = async (money: number, bet: number): Promise<number> => {
  do {
    const input = readlineSync.question(colors.bold("Set Your Bet: "));
    try {
      bet = await checkBetFormat(money, input);
    } catch (e) {
      console.log(e.message);
    }
    money -= bet;
    console.log("");
    console.log(
      colors.bold.yellow("Your bet: ") + colors.bold.yellow(`$${bet}`)
    );
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
  } while (bet === 0);
  return bet;
};
