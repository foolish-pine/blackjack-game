import { printLine } from "./printLine";
import { readLine } from "./readLine";

export const promptInput = async (text: string) => {
  printLine(`${text}`);
  return readLine();
};
