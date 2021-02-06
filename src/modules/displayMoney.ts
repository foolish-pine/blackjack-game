import colors from "colors";

export const displayMoney = async (money: number): Promise<void> => {
  console.log(
    colors.bold.yellow("Your money: ") + colors.bold.yellow(`$${money}`)
  );
};
