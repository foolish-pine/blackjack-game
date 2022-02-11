export class Card {
  constructor(
    private readonly _symbol: string,
    private readonly _number: number,
    private readonly _rank: string
  ) {}

  get symbol(): string {
    return this._symbol;
  }

  get number(): number {
    return this._number >= 11 ? 10 : this._number;
  }

  get rank(): string {
    return this._rank;
  }
}
