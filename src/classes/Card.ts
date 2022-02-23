const cardSymbolNames = ["club", "heart", "diamond", "spade"] as const;
export const cardSymbols = new Map<typeof cardSymbolNames[number], string>([
  ["club", String.fromCodePoint(0x2660)],
  ["heart", String.fromCodePoint(0x2665)],
  ["diamond", String.fromCodePoint(0x2666)],
  ["spade", String.fromCodePoint(0x2663)],
]);
const cardSymbolValues = [...cardSymbols.values()];
type CardSymbol = typeof cardSymbolValues[number];

export const cardNumberAndRanks = [
  {
    number: 1,
    rank: "A",
  },
  {
    number: 2,
    rank: "2",
  },
  {
    number: 3,
    rank: "3",
  },
  {
    number: 4,
    rank: "4",
  },
  {
    number: 5,
    rank: "5",
  },
  {
    number: 6,
    rank: "6",
  },
  {
    number: 7,
    rank: "7",
  },
  {
    number: 8,
    rank: "8",
  },
  {
    number: 9,
    rank: "9",
  },
  {
    number: 10,
    rank: "10",
  },
  {
    number: 10,
    rank: "J",
  },
  {
    number: 10,
    rank: "Q",
  },
  {
    number: 10,
    rank: "K",
  },
] as const;

const cardNumbers = cardNumberAndRanks.map(
  (cardNumberAndRank) => cardNumberAndRank.number
);
type CardNumber = typeof cardNumbers[number];

const CardRanks = cardNumberAndRanks.map(
  (cardNumberAndRank) => cardNumberAndRank.rank
);
type CardRank = typeof CardRanks[number];

export class Card {
  constructor(
    private readonly _symbol: CardSymbol,
    private readonly _number: CardNumber,
    private readonly _rank: CardRank
  ) {}

  get symbol() {
    return this._symbol;
  }

  get number() {
    return this._number;
  }

  get rank() {
    return this._rank;
  }
}
