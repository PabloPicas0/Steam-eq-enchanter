import { MarketModel } from "../models/MarketModel.js";

async function getPriceOverview(market_hash_name: string) {
  // Some items have "&" which is not accepted by Steam API
  // Instead it need to be replaced with "%26"
  const priceOverviewResponse = await fetch(
    `https://steamcommunity.com/market/priceoverview/?appid=730&market_hash_name=${market_hash_name.replace(
      "&",
      "%26"
    )}`
  );

  const priceOverview: MarketModel = await priceOverviewResponse.json();

  return priceOverview;
}

export default getPriceOverview;
