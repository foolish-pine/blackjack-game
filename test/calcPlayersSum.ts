import { describe, it } from "mocha";
import { calcSum } from "../src/modules/calcSum";
import { expect } from "chai";

describe("calcPlayersSum", () => {
  describe("正常系", () => {
    it("手札の数字の合計を返す", () => {
      expect(calcSum([2, 10])).to.equal(12);
      expect(calcSum([10, 11])).to.equal(21);
      expect(calcSum([10, 10, 10])).to.equal(30);
    });
    it("手札の数字の合計が21より大きくその中に11が含まれるとき、11を1とみなして合計を計算しなおしその値を返す", () => {
      expect(calcSum([4, 8, 11])).to.equal(13);
      expect(calcSum([2, 5, 11, 11])).to.equal(9);
      expect(calcSum([2, 9, 11, 11, 11])).to.equal(14);
      expect(calcSum([7, 7, 11, 11, 11, 11])).to.equal(18);
    });
  });
});
