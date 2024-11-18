import express from "express";

import addItemDescriptions from "../utils/addItemDescriptions.js";
import getUserInfo from "../utils/getUserInfo.js";
import getUserInventory from "../utils/getUserInventory.js";
import getPriceHistory from "../utils/getPriceHistory.js";
import getPriceOverview from "../utils/getPriceOverview.js";

import { cookieValue, webCookies } from "../index.js";

export const router = express.Router();

const forbidenItems = ["Collectible", "Music", "Stock", "Tool", "Pass"].join("|");
const isForbiden = new RegExp(forbidenItems);

router.get("/", async (req, res) => {
  const { id } = req.query;

  try {
    const [userInfo, userInventory] = await Promise.all([
      getUserInfo(process.env.STEAM_KEY, `${id}`),
      getUserInventory(`${id}`),
    ]);

    // label for each inventory item name and icon
    addItemDescriptions(userInventory);

    const filteredUserInventory = userInventory.assets.filter((item) => !isForbiden.test(item.type));

    userInventory.assets = filteredUserInventory;
    userInventory.total_inventory_count = filteredUserInventory.length;

    res.send([userInfo, userInventory]);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/", async (req, res) => {
  const marketItems: string[] = req.body;

  if (!webCookies) res.sendStatus(404);

  try {
    const priceOverview = await Promise.all(
      marketItems.map((item) => {
        return getPriceOverview(item);
      })
    );

    const priceHistory = await Promise.all(
      marketItems.map((item) => {
        return getPriceHistory(item, { headers: { Cookie: `steamLoginSecure=${cookieValue}` } });
      })
    );

    const finalPrice = priceOverview.map((itemPrice, idx) => {
      const { lowest_price, median_price, success } = itemPrice;

      itemPrice.price_history = priceHistory[idx];

      if (success) {
        itemPrice.lowest_price = lowest_price.replace("zł", "").replace(",", ".");
        itemPrice.median_price = median_price.replace("zł", "").replace(",", ".");
      }

      return itemPrice;
    });

    res.send(finalPrice);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});
