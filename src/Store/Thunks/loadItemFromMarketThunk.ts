import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdditionalItemModel } from "../../models/AdditionalItemModel";

export const loadItemFromMarket = createAsyncThunk(
  "itemsFromMarket/loadItemFromMarket",
  async (link: string) => {
    const linksParts = link.split("/");
    const lastPart = linksParts.length - 1;
    const itemName = linksParts[lastPart];

    const req = await fetch(`/api/item/${itemName}`);

    if (!req.ok) {
      throw new Error(req.statusText);
    }

    const item = (await req.json()) as AdditionalItemModel;

    return item;
  }
);
