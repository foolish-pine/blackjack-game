import colors from "colors";

export const displayMoney = async (money: number): Promise<string> => {
  return colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`);
};
