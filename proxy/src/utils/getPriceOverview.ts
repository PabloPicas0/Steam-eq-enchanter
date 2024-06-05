import { MarketModel } from "../models/MarketModel.js";

async function getPriceOverview(market_hash_name: string) {
  const priceOverviewResponse = await fetch(
    `https://steamcommunity.com/market/priceoverview/?&appid=730&market_hash_name=${market_hash_name}`
  );

  const priceOverview: MarketModel = await priceOverviewResponse.json();

  return priceOverview;
}

export default getPriceOverview