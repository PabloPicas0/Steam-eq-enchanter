import express, { Request } from "express";
import { AdditionalItemModel } from "../models/AdditionalItemModel.js";

export const router = express.Router({ mergeParams: true });

router.get("/", async (req: Request<{ name: string }>, res) => {
  const name = req.params.name.replace(/[&]/g, "%26").replace(/\s/g, "%20");
  const url = `https://steamcommunity.com/market/search/render?norender=1&appid=730&query=${name}`;

  try {
    const itemReq = await fetch(url);
    const item = (await itemReq.json()) as AdditionalItemModel;

    if (!item.results.length)
      throw new Error("Missed request " + new Date().toLocaleTimeString("en-EN", { hourCycle: "h24" }));

    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});
