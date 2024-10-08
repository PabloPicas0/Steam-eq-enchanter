import { createAsyncThunk } from "@reduxjs/toolkit";
import { MarketModel } from "../../models/MarketModel";
import { RootState, AppDispatch } from "../store";

export const loadMarketData = createAsyncThunk<
  MarketModel[],
  void,
  { state: RootState; dispatch: AppDispatch }
>("profile/loadMarketData", async (_, { getState, rejectWithValue }) => {
  const { pickedItems } = getState().profile;

  const itemsMarketName = pickedItems.map((item) => item.market_name);

  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemsMarketName),
    });
    const data = (await response.json()) as MarketModel[];

    return data;
  } catch (error) {
    return rejectWithValue(true);
  }
});
