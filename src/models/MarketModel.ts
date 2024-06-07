import { PriceHistoryModel } from "./PriceHistoryModel";

export type MarketModel = {
  success: boolean;
  lowest_price: string;
  volume: string;
  median_price: string;
  price_history: PriceHistoryModel;
};
