import colors from "colors";

export const checkResult = async (
  dealersHandNumLength: number,
  playersHandNumLength: number,
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number
): Promise<number> => {
  if (dealersSum > 21) {
    console.log(colors.bold.red("Dealer Busted"));
    money += 2 * bet;
    console.log(colors.bold.red("You Win!!"));
    console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
    console.log("");
  } else if (playersSum > 21) {
    console.log(colors.bold.blue("You Busted"));
    console.log(colors.bold.blue("You Lose"));
    console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
    console.log("");
  } else if (dealersSum === 21 && playersSum === 21) {
    if (
      (dealersHandNumLength === 2 && playersHandNumLength === 2) ||
      (dealersHandNumLength > 2 && playersHandNumLength > 2)
    ) {
      console.log(colors.bold("Draw"));
      money += bet;
    } else if (dealersHandNumLength === 2 && playersHandNumLength > 2) {
      console.log(colors.bold.blue("You Lose"));
      console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
      console.log("");
    } else {
      console.log(colors.bold.red("You Win!!"));
      console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
      console.log("");
      money += 2 * bet;
    }
  } else if (dealersSum === 21 && playersSum < 21) {
    console.log(colors.bold.blue("You Lose"));
    console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
    console.log("");
  } else if (dealersSum < 21 && playersSum === 21) {
    console.log(colors.rainbow("B L A C K J A C K"));
    console.log(colors.bold.red("You Win!!"));
    console.log(colors.bold.red("You won ") + colors.bold.red(`$${1.5 * bet}`));
    console.log("");
    money += Math.floor(2.5 * bet);
  } else {
    if (dealersSum === playersSum) {
      console.log(colors.bold("Draw"));
      money += bet;
    } else if (dealersSum > playersSum) {
      console.log(colors.bold.blue("You Lose"));
      console.log(colors.bold.blue("You lost ") + colors.bold.blue(`$${bet}`));
      console.log("");
    } else {
      console.log(colors.bold.red("You Win!!"));
      console.log(colors.bold.red("You won ") + colors.bold.red(`$${bet}`));
      console.log("");
      money += 2 * bet;
    }
  }
  return money;
};
