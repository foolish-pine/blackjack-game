import { printLine } from "../../src/utils/printLine";

const mockProcessStdoutWrite = jest.spyOn(process.stdout, "write");

afterEach(() => {
  mockProcessStdoutWrite.mockReset();
});

describe("printLine関数", () => {
  it("printLine()メソッドに渡された引数を引数にして、process.stdout.write()メソッドを1度呼び出す", () => {
    mockProcessStdoutWrite.mockImplementation();

    printLine("text");
    expect(mockProcessStdoutWrite).toHaveBeenCalledTimes(1);
    expect(mockProcessStdoutWrite).toHaveBeenCalledWith("text");
  });
});
