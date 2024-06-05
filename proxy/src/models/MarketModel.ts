import { PriceHistoryModel } from "./PriceHistoryModel.js";

export type MarketModel = {
  success: boolean;
  lowest_price: string;
  volume: string;
  median_price: string;
  price_history?: { status: number; data: PriceHistoryModel };
};
