import { describe, it } from "mocha";
import { expect } from "chai";

import { checkBetFormat } from "../src/modules/checkBetFormat";

describe("checkBetFormat", () => {
  describe("正常系: 第一引数は1000", () => {
    it("整数に変換可能で1以上1000以下の数字が入力されたときその数字を返す", async () => {
      try {
        expect(await checkBetFormat(1000, "1")).equal(1);
        expect(await checkBetFormat(1000, "500")).equal(500);
        expect(await checkBetFormat(1000, "1000")).equal(1000);
        expect(await checkBetFormat(1000, "100.00")).equal(100);
      } catch (e) {
        throw e;
      }
    });
  });
  describe("異常系: 第一引数は1000", () => {
    it("Number型に変換できない入力が渡されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "string");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease input a positive integer.");
      }
    });
    it("正の小数が入力されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "10.5");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease input a positive integer.");
      }
    });
    it("0が入力されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "0");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease input a positive integer.");
      }
    });
    it("負の整数が入力されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "-100");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease input a positive integer.");
      }
    });
    it("負の小数が入力されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "-3.33");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease input a positive integer.");
      }
    });
    it("第1引数より大きい整数が入力されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "1001");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease bet an amount of money you can.");
      }
    });
    it("第1引数より大きい整数が入力されたときにメッセージとともにエラーを返す", async () => {
      try {
        await checkBetFormat(1000, "10000");
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).equal("\nPlease bet an amount of money you can.");
      }
    });
  });
});
