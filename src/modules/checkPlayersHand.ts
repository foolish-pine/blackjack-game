export const checkPlayersHand = (playersHandNum: number[]): string => {
  let playersSum = playersHandNum.reduce((a, b) => a + b);
  if (playersSum > 21 && playersHandNum.includes(11)) {
    playersSum -= playersHandNum.filter((num) => num === 11).length * 10;
  }
  if (playersSum < 21) {
    return "selectable";
  } else {
    return "result";
  }
};
