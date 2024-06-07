export type PriceHistoryModel = {
  success: boolean;
  price_prefix: string;
  price_suffix: string;
  prices: [string, number, string][];
};
