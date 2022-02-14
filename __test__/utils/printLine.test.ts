import { printLine } from "../../src/utils/printLine";

describe("printLine関数", () => {
  it("printLine()メソッドに渡された引数を引数にして、process.stdout.write()メソッドを1度呼び出す", () => {
    const mockProcessStdoutWrite = jest
      .spyOn(process.stdout, "write")
      .mockImplementation();
    printLine("text");
    expect(mockProcessStdoutWrite).toHaveBeenCalledTimes(1);
    expect(mockProcessStdoutWrite).toHaveBeenCalledWith("text");
  });
});
