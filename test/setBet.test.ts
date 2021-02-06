import { describe, it } from "mocha";
import { expect } from "chai";

import { checkBetFormat } from "./../src/modules/checkBetFormat";

const setBet = async (
  bet: number,
  money: number,
  input: string
): Promise<{ money: number; bet: number }> => {
  do {
    try {
      bet = await checkBetFormat(money, input);
    } catch (e) {
      console.log(e.message);
    }
    money -= bet;
  } while (bet === 0);
  return { bet, money };
};

describe("setBet", () => {
  describe("正常系:", () => {
    it("設定したbetと現在の所持金からbetを差し引いたmoneyを返す", async () => {
      try {
        expect(await setBet(0, 1000, "1")).deep.equal({ bet: 1, money: 999 });
        expect(await setBet(0, 1000, "222")).deep.equal({
          bet: 222,
          money: 778,
        });
        expect(await setBet(0, 1000, "1000")).deep.equal({
          bet: 1000,
          money: 0,
        });
        expect(await setBet(0, 1000, "555.00")).deep.equal({
          bet: 555,
          money: 445,
        });
      } catch (e) {
        throw e;
      }
    });
  });
});
