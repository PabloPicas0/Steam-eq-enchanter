import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { loadItemFromMarket } from "../Thunks/loadItemFromMarketThunk";

const itemsFromMarketSlice = createSlice({
  name: "itemsFromMarket",
  initialState: {
    marketItems: [] as AdditionalItemModel[],
    isUserEquipment: true,
    pending: false,
  },
  reducers: {
    isEquipmentMode: (state, action: PayloadAction<boolean>) => {
      state.isUserEquipment = action.payload;
    },
    addMarketItem: (state, action: PayloadAction<AdditionalItemModel>) => {
      state.marketItems.push(action.payload);
    },
    removeMarketitem: (state, action: PayloadAction<string>) => {
      state.marketItems = state.marketItems.filter(
        (item) => item.results[0].asset_description.classid !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(loadItemFromMarket.pending, (state) => {
      state.pending = true;
    });

    builder.addCase(loadItemFromMarket.fulfilled, (state, action) => {
      state.pending = false;
      state.marketItems.push(action.payload);
    });

    builder.addCase(loadItemFromMarket.rejected, (state) => {
      state.pending = false;
    });
  },
});

export const { isEquipmentMode, addMarketItem, removeMarketitem } = itemsFromMarketSlice.actions;
export default itemsFromMarketSlice.reducer;
