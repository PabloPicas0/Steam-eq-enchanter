import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const itemsFromMarketSlice = createSlice({
  name: "itemsFromMarket",
  initialState: {
    marketItems: [],
    isUserEquipment: true,
    error: false,
    pending: false,
  },
  reducers: {
    isEquipmentMode: (state, action: PayloadAction<boolean>) => {
      state.isUserEquipment = action.payload;
    },
  },
});

export const { isEquipmentMode } = itemsFromMarketSlice.actions;
export default itemsFromMarketSlice.reducer;
