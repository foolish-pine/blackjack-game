import { printLine } from "../../src/utils/printLine";

describe("printLine関数", () => {
  it("printLine()メソッドに渡された引数を引数にして、process.stdout.write()メソッドを1度呼び出す", () => {
    const spy = jest.spyOn(process.stdout, "write");
    printLine("text");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("text");
  });
});
