import https, { RequestOptions } from "https";
import { PriceHistoryModel } from "../models/PriceHistoryModel.js";

function getPriceHistory(item: string, options?: RequestOptions) {
  const url = `https://steamcommunity.com/market/pricehistory/?appid=730&market_hash_name=${item}`;

  return new Promise<{ status: number; data: PriceHistoryModel }>((resolve, reject) => {
    let data = [];

    https.get(url, options, (res) => {
      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        const buffer: PriceHistoryModel = JSON.parse(Buffer.concat(data).toString("utf8"));

        resolve({ status: res.statusCode, data: buffer });
      });

      res.on("error", (err) => {
        reject(err);
      });
    });
  });
}

export default getPriceHistory;
