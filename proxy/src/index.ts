import express from "express";
import cors from "cors";

import { AddressInfo } from "net";

import { LoginSession, EAuthTokenPlatformType } from "steam-session";

import getUserInfo from "./utils/getUserInfo.js";
import getUserInventory from "./utils/getUserInventory.js";
import getPriceOverview from "./utils/getPriceOverview.js";
import getPriceHistory from "./utils/getPriceHistory.js";
import addItemDescriptions from "./utils/addItemDescriptions.js";

const POLISH_CURRENCY_PRICE = 3.95; // Jun 5 2024, 13:17 UTC

const app = express();

app.use(cors());
app.use(express.json());

const session = new LoginSession(EAuthTokenPlatformType.WebBrowser);
session.refreshToken = process.env.REFRESH_TOKEN;

const webCookies = await session.getWebCookies();

app.get("/", async (req, res) => {
  const { id } = req.query;

  try {
    const [userInfo, userInventory] = await Promise.all([
      getUserInfo(process.env.STEAM_KEY, `${id}`),
      getUserInventory(`${id}`),
    ]);

    // label for each inventory item name and icon
    addItemDescriptions(userInventory);

    const filteredUserInventory = userInventory.assets.filter(
      (item) => !item.type.includes("Collectible") && !item.type.includes("Music")
    );

    userInventory.assets = filteredUserInventory;
    userInventory.total_inventory_count = filteredUserInventory.length;

    res.send([userInfo, userInventory]);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

app.post("/", async (req, res) => {
  const marketItems: string[] = req.body;
  const cookie = webCookies[2]

  if (!webCookies) res.sendStatus(404)

  // get steam cookie value needed for price history
  const start = cookie.indexOf("=") + 1
  const end = cookie.indexOf(";")
  const cookieValue = cookie.slice(start, end)

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
      if (priceHistory[idx].success) {
        priceHistory[idx].prices.forEach((price) => (price[1] = Number(price[1] / POLISH_CURRENCY_PRICE))); // convert price history from PLN to USD
      }

      priceHistory[idx].price_suffix = "USD";
      itemPrice.price_history = priceHistory[idx];

      return itemPrice;
    });

    res.send(finalPrice);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

const listener = app.listen(process.env.PORT || 3001, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Your app is listening to http://localhost:${port}?id=76561198323329181`);
  console.log("Press ctrl + c to exit");
});
