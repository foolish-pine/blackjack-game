import { describe, it } from "mocha";
import { checkPlayersHand } from "../src/modules/checkPlayersHand";
import { expect } from "chai";

describe("checkPlayersHand", () => {
  describe("正常系", () => {
    it("手札の数字の合計が21未満のとき'selectable'を返す", () => {
      expect(checkPlayersHand([2, 10])).to.equal("selectable");
      expect(checkPlayersHand([3, 11])).to.equal("selectable");
      expect(checkPlayersHand([9, 11])).to.equal("selectable");
    });
    it("手札の数字の合計が21以上のとき'result'を返す", () => {
      expect(checkPlayersHand([10, 11])).to.equal("result");
      expect(checkPlayersHand([4, 8, 10])).to.equal("result");
      expect(checkPlayersHand([6, 8, 10])).to.equal("result");
    });
    it("手札の数字の合計が21より大きくその中に11が含まれるとき、11を1とみなして判定する", () => {
      expect(checkPlayersHand([4, 8, 11])).to.equal("selectable");
      expect(checkPlayersHand([11, 11])).to.equal("selectable");
      expect(checkPlayersHand([6, 8, 11, 11, 11])).to.equal("selectable");
      expect(checkPlayersHand([6, 8, 11, 11, 11, 11])).to.equal("selectable");
    });
  });
});
