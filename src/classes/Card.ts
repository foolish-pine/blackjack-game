export class Card {
  private _symbol: string;
  private _number: number;
  private _rank: string;

  constructor(symbol: string, number: number, rank: string) {
    this._symbol = symbol;
    this._number = number;
    this._rank = rank;
  }

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
