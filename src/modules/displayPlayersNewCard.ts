import colors from "colors";

import { Card } from "../types/Card";

export const displayPlayersNewCard = async (
  playersHand: Card[]
): Promise<void> => {
  if (
    playersHand[playersHand.length - 1].symbol === "♥" ||
    playersHand[playersHand.length - 1].symbol === "♦"
  ) {
    console.log(
      colors.bold("Your new card: ") +
        colors.red.bgWhite(
          ` ${playersHand[playersHand.length - 1].symbol} ${
            playersHand[playersHand.length - 1].rank
          } `
        )
    );
    console.log("");
  } else {
    console.log(
      colors.bold("Your new card: ") +
        colors.black.bgWhite(
          ` ${playersHand[playersHand.length - 1].symbol} ${
            playersHand[playersHand.length - 1].rank
          } `
        )
    );
    console.log("");
  }
};
