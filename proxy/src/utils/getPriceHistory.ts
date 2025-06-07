import { PriceHistoryModel } from "../models/PriceHistoryModel.js";

async function getPriceHistory(market_hash_name: string, options?: RequestInit) {
  // Some items have "&" which is not accepted by Steam API
  // Instead it need to be replaced with "%26"
  const url = `https://steamcommunity.com/market/pricehistory/?appid=730&market_hash_name=${market_hash_name.replace(
    "&",
    "%26"
  )}`;

  const res = await fetch(url, options);

  if (!res.ok) throw new Error(`Unable to fetch price history. Reason: ${res.statusText}, Code: ${res.status}`);

  const history: PriceHistoryModel = await res.json();

  return history;
}

export default getPriceHistory;
