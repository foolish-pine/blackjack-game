import { printLine } from "./printLine";
import { readLine } from "./readLine";

export const promptSelect = async <T extends string>(
  text: string,
  values: readonly T[]
): Promise<T> => {
  printLine(`${text}`);
  printLine(`> `);

  const input = (await readLine()) as T;
  if (values.includes(input)) {
    return input;
  } else {
    return promptSelect<T>(text, values);
  }
};
