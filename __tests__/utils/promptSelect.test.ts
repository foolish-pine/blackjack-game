import { printLine } from "../../src/utils//printLine";
import { readLine } from "../../src/utils/readLine";
import { promptSelect } from "../../src/utils/promptSelect";

jest.mock("../../src/utils/printLine");
jest.mock("../../src/utils/readLine");

const mockPrintLine = printLine as jest.Mock;
const mockReadLine = readLine as jest.Mock;

afterEach(() => {
  jest.resetAllMocks();
});

describe("promptSelect関数", () => {
  it("引数のテキストを標準出力に表示し、標準入力から入力を受け取ってreadLine関数に渡す。受け取った文字列が引数の配列に含まれる場合、その文字列を返す", async () => {
    mockReadLine.mockResolvedValue(`input`);

    const input = await promptSelect(`question`, ["input"]);
    expect(mockPrintLine).toHaveBeenCalledTimes(2);
    expect(mockPrintLine).toHaveBeenCalledWith(`question`);
    expect(mockPrintLine).toHaveBeenCalledWith(`> `);
    expect(mockReadLine).toHaveBeenCalledTimes(1);
    expect(input).toBe("input");
  });
});
