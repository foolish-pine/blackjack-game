import { readLine } from "../../src/utils/readLine";

describe("readLine関数", () => {
  it("標準入力から入力を受け取り、文字列に変換したあとtrim()メソッドを実行してその値を返す", async () => {
    const stdin = require("mock-stdin").stdin();
    process.nextTick(() => {
      stdin.send(`test`);
    });

    const result = await readLine();
    expect(result).toBe(`test`);
  });
});
