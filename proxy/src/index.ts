import express from "express";
import cors from "cors";

import { AddressInfo } from "net";

import getUserInfo from "./utils/getUserInfo.js"
import getUserInventory from "./utils/getUserInventory.js";

const app = express();

app.use(cors());

app.get("/", async (req, res) => {

  const [userInfo, userInventory] = await Promise.all([
    getUserInfo(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=76561198196802546`
    ),
    getUserInventory("76561198196802546"),
  ]);

  res.send([userInfo, userInventory]);
});

const listener = app.listen(process.env.PORT || 3001, () => {
  const { port } = listener.address() as AddressInfo;
  console.log(`Your app is listening to localhost:${port}`);
  console.log("Press ctrl + c to exit");
});
