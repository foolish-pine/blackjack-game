import { describe, it } from "mocha";
import { setBet } from "../src/modules/setBet";
import { expect } from "chai";

describe("setBet", () => {
  describe("正常系: 第一引数は1000", () => {
    it("1が入力されたとき1を返す", () => {
      expect(setBet(1000, "1")).to.equal(1);
    });
    it("500が入力されたとき500を返す", () => {
      expect(setBet(1000, "500")).to.equal(500);
    });
    it("1000が入力されたとき1000を返す", () => {
      expect(setBet(1000, "1000")).to.equal(1000);
    });
    it("100.00が入力されたとき100を返す", () => {
      expect(setBet(1000, "100.00")).to.equal(100);
    });
  });
  describe("異常系: 第一引数は1000", () => {
    it("Number型に変換できない入力が渡されたときにメッセージとともにエラーを返す", () => {
      expect(() => setBet(1000, "string")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("正の小数が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => setBet(1000, "10.5")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("負の小数が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => setBet(1000, "-2.5")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("0が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => setBet(1000, "0")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("負の整数が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => setBet(1000, "-100")).to.throw(
        Error,
        "\nPlease input a positive integer."
      );
    });
    it("1001が入力されたときにメッセージとともにエラーを返す", () => {
      expect(() => setBet(1000, "1001")).to.throw(
        Error,
        "\nPlease bet an amount of money you can."
      );
    });
  });
});
