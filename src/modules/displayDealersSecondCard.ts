import colors from "colors";

import { Card } from "../types/Card";

export const displayDealersSecondCard = async (
  dealersHand: Card[]
): Promise<void> => {
  // ディーラーの2枚目のハンドをオープンにして表示する
  dealersHand[1].isOpen = true;
  let dealer = colors.bold("Dealer's second card: ");
  if (dealersHand[1].symbol === "♥" || dealersHand[1].symbol === "♦") {
    dealer += colors.red.bgWhite(
      ` ${dealersHand[1].symbol} ${dealersHand[1].rank} `
    );
  } else {
    dealer += colors.black.bgWhite(
      ` ${dealersHand[1].symbol} ${dealersHand[1].rank} `
    );
  }
  console.log(dealer);
  console.log("");
};
