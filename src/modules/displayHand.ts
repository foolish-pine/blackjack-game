import readlineSync from "readline-sync";
import colors from "colors";

import { Card } from "../types/Card";

export const displayHand = async (
  dealersHand: Card[],
  playersHand: Card[]
): Promise<void> => {
  let dealer = colors.bold(`Dealer: `);
  let player = colors.bold(`You:    `);
  for (let i = 0; i < dealersHand.length; i++) {
    if (dealersHand[i].isOpen) {
      if (dealersHand[i].symbol === "♥" || dealersHand[i].symbol === "♦") {
        dealer += colors.red.bgWhite(
          ` ${dealersHand[i].symbol} ${dealersHand[i].rank} `
        );
      } else {
        dealer += colors.black.bgWhite(
          ` ${dealersHand[i].symbol} ${dealersHand[i].rank} `
        );
      }
    } else {
      dealer += colors.black.bgWhite(" ??? ");
    }
    dealer += "  ";
  }
  for (let i = 0; i < playersHand.length; i++) {
    if (playersHand[i].symbol === "♥" || playersHand[i].symbol === "♦") {
      player += colors.red.bgWhite(
        ` ${playersHand[i].symbol} ${playersHand[i].rank} `
      );
    } else {
      player += colors.black.bgWhite(
        ` ${playersHand[i].symbol} ${playersHand[i].rank} `
      );
    }
    player += "  ";
  }
  console.log(dealer);
  console.log("");
  console.log(player);
  console.log("");
  readlineSync.question(colors.bold("(Enter)"));
  console.log("");
};
