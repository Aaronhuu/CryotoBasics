export interface CurrencyInfo {
  id: string;
  name: string;
  symbol: string;
}

export interface FiatInfo {
  id: string;
  name: string;
  symbol: string;
  code: string;
}

export interface AllCurrencyInfo {
  crypto: CurrencyInfo[];
  fiat: FiatInfo[];
}
