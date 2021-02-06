import { describe, it } from "mocha";
import { calcSum } from "../src/modules/calcSum";
import { expect } from "chai";

describe("calcSum", () => {
  describe("正常系", () => {
    it("手札の数字の合計を返す", async () => {
      try {
        expect(await calcSum([2, 10])).equal(12);
        expect(await calcSum([10, 11])).equal(21);
        expect(await calcSum([10, 10, 10])).equal(30);
      } catch (e) {
        throw e;
      }
    });
    it("手札の数字の合計が21より大きいかつその中に11が含まれるとき、11を1とみなして合計を計算しなおしその値を返す", async () => {
      try {
        expect(await calcSum([11, 11])).equal(2);
        expect(await calcSum([10, 11, 11])).equal(12);
        expect(await calcSum([2, 11, 11, 11])).equal(5);
        expect(await calcSum([5, 11, 11, 11, 11])).equal(9);
      } catch (e) {
        throw e;
      }
    });
  });
});
