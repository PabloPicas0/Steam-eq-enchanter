import { AdditionalItemModel } from "../models/AdditionalItemModel.js";

async function getSteamMarketItem(itemName: string) {
  const url = `https://steamcommunity.com/market/search/render?norender=1&appid=730&query=${itemName}`;

  const itemReq = await fetch(url);
  const item = (await itemReq.json()) as AdditionalItemModel;

  if (!item?.results.length)
    throw new Error("Missed request " + new Date().toLocaleTimeString("en-EN", { hourCycle: "h24" }));

  const { sell_price_text } = item.results[0];

  item.results[0].sell_price_text = sell_price_text.replace("$", "");
  
  return item;
}

export default getSteamMarketItem;
