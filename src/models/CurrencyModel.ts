export type CurrencyModel = {
  currency: string;
  code: string;
  mid: number;
}[];

export type CurrencyTableModel = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: { currency: string; code: string; mid: number }[];
}[];

