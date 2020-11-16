export const calcSum = async (handNum: number[]): Promise<number> => {
  let sum = handNum.reduce((a, b) => a + b);
  if (sum > 21 && handNum.includes(11)) {
    sum -= handNum.filter((num) => num === 11).length * 10;
  }
  return sum;
};
