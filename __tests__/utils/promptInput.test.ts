import { printLine } from "../../src/utils//printLine";
import { promptInput } from "../../src/utils/promptInput";

jest.mock("../../src/utils/printLine");

const mockPrintLine = printLine as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("promptInput関数", () => {
  it("引数のテキストを標準出力に表示し、標準入力から入力を受け取ってreadLine関数に渡す", async () => {
    const stdin = require("mock-stdin").stdin();
    process.nextTick(() => {
      stdin.send(`answer`);
    });

    const result = await promptInput(`question`);
    expect(mockPrintLine).toHaveBeenCalledTimes(1);
    expect(mockPrintLine).toHaveBeenCalledWith(`question`);
    expect(result).toBe(`answer`);
  });
});
