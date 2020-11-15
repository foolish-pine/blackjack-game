export const setBet = (money: number, input: string): number => {
  if (
    isNaN(Number(input)) ||
    !Number.isInteger(Number(input)) ||
    Number(input) <= 0
  ) {
    throw new Error("\nPlease input a positive integer.");
  } else if (Number(input) > money) {
    throw new Error("\nPlease bet an amount of money you can.");
  } else {
    return Number(input);
  }
};
