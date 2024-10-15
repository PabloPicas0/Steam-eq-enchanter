import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { RootState } from "../store";

export const loadItemFromMarket = createAsyncThunk<AdditionalItemModel, string, { state: RootState }>(
  "itemsFromMarket/loadItemFromMarket",
  async (link: string, { getState, rejectWithValue }) => {
    try {
      const { marketItems } = getState().itemsFromMarket;

      const linksParts = link.split("/");
      const lastPart = linksParts.length - 1;
      const itemName = decodeURIComponent(linksParts[lastPart]);

      if (marketItems.length === 10 || marketItems.some((item) => item.results[0].hash_name === itemName))
        return rejectWithValue(false);

      const req = await fetch(`/api/market/item/${itemName}`);

      if (!req.ok) {
        throw new Error(req.statusText);
      }

      const item = (await req.json()) as AdditionalItemModel;

      return item;
    } catch (error) {
      console.error(error);
      return rejectWithValue(false);
    }
  }
);
