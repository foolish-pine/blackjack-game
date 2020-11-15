import { describe, it } from "mocha";
import { checkBetFormat } from "../src/modules/checkBetFormat";
import { expect } from "chai";

describe("setBet", () => {
  describe("正常系: 第一引数は1000", () => {
    it("整数に変換可能で1以上1000以下の数字が入力されたときその数字を返す", () => {
      expect(checkBetFormat(1000, "1")).to.equal(1);
      expect(checkBetFormat(1000, "500")).to.equal(500);
      expect(checkBetFormat(1000, "1000")).to.equal(1000);
      expect(checkBetFormat(1000, "100.00")).to.equal(100);
    });
  });
  describe("異常系: 第一引数は1000", () => {
    it("Number型に変換できない入力が渡されたときにメッセージとともにエラーを返す", () => {
      expect(() => checkBetFormat(1000, "string")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("正の小数が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => checkBetFormat(1000, "10.5")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("0が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => checkBetFormat(1000, "0")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("負の小数・整数が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => checkBetFormat(1000, "-100")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
      expect(() => checkBetFormat(1000, "-2.5")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("1000より大きい数字が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => checkBetFormat(1000, "1001")).to.throw(
        Error,
        "\nPlease bet an amount of money you can."
      );
      expect(() => checkBetFormat(1000, "10000")).to.throw(
        Error,
        "\nPlease bet an amount of money you can."
      );
    });
  });
});
