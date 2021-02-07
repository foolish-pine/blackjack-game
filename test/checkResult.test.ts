import { describe, it } from "mocha";
import { expect } from "chai";

const checkResult = async (
  dealersHandNumLength: number,
  playersHandNumLength: number,
  dealersSum: number,
  playersSum: number,
  money: number,
  bet: number
): Promise<number> => {
  if (dealersSum > 21 || playersSum > 21) {
    if (dealersSum > 21) {
      money += 2 * bet;
    } else if (playersSum > 21) {
    }
  } else {
    if (
      !(dealersHandNumLength === 2 && dealersSum === 21) &&
      playersHandNumLength === 2 &&
      playersSum === 21
    ) {
      money += 2.5 * bet;
      money = Math.floor(money);
    } else {
      if (dealersSum === playersSum) {
        money += bet;
      } else if (dealersSum > playersSum) {
      } else {
        money += 2 * bet;
      }
    }
  }
  if (money === 0) {
    return money;
  } else {
    return money;
  }
};

describe("checkResult", () => {
  describe("正常系", () => {
    it("ディーラーの手札の合計が21より大きいとき、moneyにbetの2倍の数字を足して返す", async () => {
      try {
        expect(await checkResult(2, 2, 22, 10, 100, 10)).equal(120);
        expect(await checkResult(3, 2, 25, 21, 1000, 1)).equal(1002);
      } catch (e) {
        throw e;
      }
    });
    it("プレイヤーの手札の合計が21より大きいとき、moneyを返す", async () => {
      try {
        expect(await checkResult(2, 3, 20, 22, 100, 10)).equal(100);
        expect(await checkResult(2, 4, 18, 25, 1000, 1)).equal(1000);
      } catch (e) {
        throw e;
      }
    });
    it("ディーラーとプレイヤーの双方がバーストしていないとき、かつディーラーがブラックジャックではないかつプレイヤーがブラックジャックのとき、moneyにbetの2.5倍の数字を足して返す。このとき小数点以下は切り捨てられる。", async () => {
      try {
        expect(await checkResult(2, 2, 20, 21, 100, 100)).equal(350);
        expect(await checkResult(2, 2, 18, 21, 1000, 333)).equal(1832);
      } catch (e) {
        throw e;
      }
    });
    it("ディーラーとプレイヤーの双方がバーストしていないとき、かつディーラーもプレイヤーもブラックジャックでないかブラックジャックであるとき、かつディーラーとプレイヤーの手札の合計が同じとき、moneyにbetを足して返す。", async () => {
      try {
        expect(await checkResult(2, 2, 20, 20, 100, 100)).equal(200);
        expect(await checkResult(5, 2, 18, 18, 1000, 3)).equal(1003);
        expect(await checkResult(2, 4, 17, 17, 1000, 123)).equal(1123);
        expect(await checkResult(2, 2, 21, 21, 1000, 150)).equal(1150);
        expect(await checkResult(3, 3, 21, 21, 1000, 444)).equal(1444);
      } catch (e) {
        throw e;
      }
    });
    it("ディーラーとプレイヤーの双方がバーストしていないとき、かつプレイヤーがブラックジャックでないとき、かつディーラーがブラックジャックであるかディーラーの手札の合計がプレイヤーより大きいとき、moneyを返す。", async () => {
      try {
        expect(await checkResult(2, 2, 20, 19, 100, 100)).equal(100);
        expect(await checkResult(2, 2, 21, 17, 1000, 3)).equal(1000);
        expect(await checkResult(3, 2, 18, 15, 1000, 123)).equal(1000);
        expect(await checkResult(2, 3, 18, 15, 1000, 123)).equal(1000);
        expect(await checkResult(3, 2, 21, 20, 1000, 444)).equal(1000);
      } catch (e) {
        throw e;
      }
    });
    it("ディーラーとプレイヤーの双方がバーストしていないとき、かつプレイヤーがブラックジャックでないとき、ディーラーの手札の合計がプレイヤーより小さいとき、moneyにbetの2倍を足してを返す。", async () => {
      try {
        expect(await checkResult(2, 2, 19, 20, 100, 100)).equal(300);
        expect(await checkResult(2, 3, 18, 19, 1000, 3)).equal(1006);
        expect(await checkResult(3, 2, 18, 19, 1000, 3)).equal(1006);
        expect(await checkResult(2, 3, 18, 21, 1000, 123)).equal(1246);
      } catch (e) {
        throw e;
      }
    });
  });
});
