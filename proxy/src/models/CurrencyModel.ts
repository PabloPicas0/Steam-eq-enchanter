export type CurrencyModel = {
  table: string;
  currency: string;
  code: string;
  rates: { no: string; effectiveDate: string; mid: number }[];
};

export type CurrencyTableModel = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: { currency: string; code: string; mid: number }[];
}[];
