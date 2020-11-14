import readlineSync from "readline-sync";
import colors from "colors";

export const setBet = (money: number): string | number => {
  const input = readlineSync.question(colors.bold("Set Your Bet: "));
  if (
    isNaN(Number(input)) ||
    !Number.isInteger(Number(input)) ||
    Number(input) <= 0
  ) {
    return "\nPlease input a positive integer.";
  } else if (Number(input) > money) {
    return "\nPlease bet an amount of money you can.";
  } else {
    return Number(input);
  }
};
