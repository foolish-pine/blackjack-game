import readlineSync from "readline-sync";
import colors from "colors";

import { checkBetFormat } from "./checkBetFormat";

export const setBet = async (
  bet: number,
  money: number
): Promise<{ money: number; bet: number }> => {
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
  return { bet, money };
};
