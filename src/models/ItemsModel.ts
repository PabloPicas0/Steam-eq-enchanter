import { PriceHistoryModel } from "./PriceHistoryModel";

export type ItemModel = {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: number;
  name: string;
  icon_url: string;
  market_name: string;
  type: string;
  color: string;
  quality: number;
  market_price?: null | string;
  volume?: null | string;
  price_history?: null | PriceHistoryModel;
};
