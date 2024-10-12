import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { loadItemFromMarket } from "../Thunks/loadItemFromMarketThunk";

const itemsFromMarketSlice = createSlice({
  name: "itemsFromMarket",
  initialState: {
    marketItems: [] as AdditionalItemModel[],
    isUserEquipment: true,
    error: false,
    pending: false,
  },
  reducers: {
    isEquipmentMode: (state, action: PayloadAction<boolean>) => {
      state.isUserEquipment = action.payload;
    },
    addMarketItem: (state, action: PayloadAction<AdditionalItemModel>) => {
      state.marketItems.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadItemFromMarket.pending, (state) => {
      state.pending = true
    })

    builder.addCase(loadItemFromMarket.fulfilled, (state, action) => {
      state.pending = false
      state.error = false
      state.marketItems.push(action.payload)
    })
  },
});

export const { isEquipmentMode, addMarketItem } = itemsFromMarketSlice.actions;
export default itemsFromMarketSlice.reducer;
