import colors from "colors";

export const displayMoney = (money: number): void => {
  console.log(
    colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
  );
};
