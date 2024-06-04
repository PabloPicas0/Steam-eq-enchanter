import https, { RequestOptions } from "https";

function getPriceHistory(options?: RequestOptions) {
  const url =
    "https://steamcommunity.com/market/pricehistory/?country=PT&currency=3&appid=730&market_hash_name=Falchion%20Case";

  return new Promise((resolve, reject) => {
    let data = [];

    https.get(url, options, (res) => {
      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        const buffer = Buffer.concat(data).toString("utf8");

        resolve({ data: buffer, headers: res.headers });
      });

      res.on("error", (err) => {
        reject(err);
      });
    });
  });
}

export default getPriceHistory;
