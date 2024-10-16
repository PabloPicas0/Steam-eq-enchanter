import express, { Request } from "express";
import { cookieValue } from "../index.js";

import getPriceHistory from "../utils/getPriceHistory.js";
import getSteamMarketItem from "../utils/getSteamMarketItem.js";

export const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request<{ name: string }>, res) => {
  const name = req.params.name.replace(/[&]/g, "%26").replace(/\s/g, "%20");

  try {
    const [item, price_history] = await Promise.all([
      getSteamMarketItem(name),
      getPriceHistory(name, { headers: { Cookie: `steamLoginSecure=${cookieValue}` } }),
    ]);

    if (price_history.success) {
      item.results[0].price_history = price_history;
    }

    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});
