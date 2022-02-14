export const readLine = async () => {
  const input: string = await new Promise((resolve) =>
    process.stdin.once("data", (data) => resolve(data.toString()))
  );

  return input.trim();
};
