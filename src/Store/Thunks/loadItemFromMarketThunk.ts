import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { RootState } from "../store";

export const loadItemFromMarket = createAsyncThunk<AdditionalItemModel, string, { state: RootState }>(
  "itemsFromMarket/loadItemFromMarket",
  async (itemName: string) => {
    const req = await fetch(`/api/item/${itemName}`);

    if (!req.ok) {
      throw new Error(req.statusText);
    }

    const item = (await req.json()) as AdditionalItemModel;

    return item;
  }
);
