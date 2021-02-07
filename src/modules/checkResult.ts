import readlineSync from "readline-sync";
import colors from "colors";

import { displayMoney } from "./displayMoney";

export const checkResult = async (
  dealersHandNumLength: number,
  playersHandNumLength: number,
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number
): Promise<number> => {
  if (dealersSum > 21 || playersSum > 21) {
    if (dealersSum > 21) {
      console.log(colors.bold.red("Dealer Burst"));
      money += 2 * bet;
      console.log(colors.bold.red("You Win!!"));
      console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
    } else if (playersSum > 21) {
      console.log(colors.bold.blue("You Burst"));
      console.log(colors.bold.blue("You Lose"));
      console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
    }
  } else {
    if (
      !(dealersHandNumLength === 2 && dealersSum === 21) &&
      playersHandNumLength === 2 &&
      playersSum === 21
    ) {
      console.log(colors.rainbow("B L A C K J A C K"));
      money += 2.5 * bet;
      money = Math.floor(money);
      console.log(colors.bold.red("You Win!!"));
      console.log(
        colors.bold.red("You won ") + colors.bold.red(`$${1.5 * bet}`)
      );
    } else {
      if (dealersSum === playersSum) {
        console.log(colors.bold("Draw"));
        money += bet;
      } else if (dealersSum > playersSum) {
        console.log(colors.bold.blue("You Lose"));
        console.log(
          colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`)
        );
      } else {
        money += 2 * bet;
        console.log(colors.bold.red("You Win!!"));
        console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
      }
    }
  }
  if (money === 0) {
    console.log(colors.bold("You have no money."));
    console.log(colors.bold("GAME OVER!"));
    return money;
  } else {
    await displayMoney(money);
    console.log(colors.bold("Please Enter to start next game"));
    readlineSync.question(colors.bold("(Enter)"));
    console.log("");
    return money;
  }
};
