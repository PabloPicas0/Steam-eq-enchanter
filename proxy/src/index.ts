import express from "express";
import cors from "cors";

import { AddressInfo } from "net";

import getUserInfo from "./utils/getUserInfo.js";
import getUserInventory from "./utils/getUserInventory.js";

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  const { id } = req.query;

  try {
    const [userInfo, userInventory] = await Promise.all([
      getUserInfo(process.env.STEAM_KEY, `${id}`),
      getUserInventory(`${id}`),
    ]);

    // label for each inventory item name and icon
    for (let i = 0; i < userInventory.assets.length; ++i) {
      const item = userInventory.assets[i];

      for (let j = 0; j < userInventory.descriptions.length; ++j) {
        const description = userInventory.descriptions[j];

        if (item.classid === description.classid) {
          const color = description.tags.find((tag) => tag.color).color;

          item.name = description.name;
          item.market_name = description.market_name;
          item.icon_url = description.icon_url;
          item.type = description.type;
          item.color = color;
          break;
        }
      }
    }

    const filteredUserInventory = userInventory.assets.filter(
      (item) => !item.type.includes("Collectible") && !item.type.includes("Music")
    );

    userInventory.assets = filteredUserInventory;
    userInventory.total_inventory_count = filteredUserInventory.length;

    const [marketItem] = await Promise.all([
      fetch(
        "https://steamcommunity.com/market/search/render?norender=1&start=0&count=1&appid=730&query=P250 | Sand Dune (Battle-Scarred)"
      ),
    ]);

    const [t] = [await marketItem.json()];


    res.send([userInfo, userInventory, t]);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

const listener = app.listen(process.env.PORT || 3001, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Your app is listening to localhost:${port}`);
  console.log("Press ctrl + c to exit");
});
