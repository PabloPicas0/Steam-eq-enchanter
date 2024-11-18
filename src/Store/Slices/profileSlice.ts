import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CurrencyTableModel } from "../../models/CurrencyModel";
import { EquipmentModel } from "../../models/EquipmentModel";
import { UserModel } from "../../models/UserModel";
import { ItemModel } from "../../models/ItemsModel";

import { loadProfile } from "../Thunks/loadProfileThunk";
import { loadMarketData } from "../Thunks/loadMarketDataThunk";

const savedFavouriteItems = JSON.parse(localStorage.getItem("favourite") || "[]") as string[];

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    items: [] as (UserModel & EquipmentModel)[],
    pickedItems: [] as ItemModel[],
    favouriteItems: savedFavouriteItems,
    currencies: [] as CurrencyTableModel,
    error: false,
    pending: false,
  },
  reducers: {
    addToPickedItems: (state, action: PayloadAction<{ market_name: string; item: ItemModel }>) => {
      const { item, market_name } = action.payload;
      const itemExists = state.pickedItems.some((item) => item.market_name === market_name);

      // Max items we want to have picked is 10
      if (itemExists || state.pickedItems.length === 10) {
        return;
      }

      state.pickedItems = [...state.pickedItems, { ...item }];
    },
    removeFromPickedItems: (state, action: PayloadAction<string>) => {
      state.pickedItems = state.pickedItems.filter((item) => item.market_name !== action.payload);
    },
    addToFavouriteItems: (state, action: PayloadAction<string>) => {
      if (state.favouriteItems.length === 10) return;

      const newState = [...state.favouriteItems, action.payload];

      localStorage.setItem("favourite", JSON.stringify(newState));
      state.favouriteItems = newState;
    },
    removeFromFavouriteItems: (state, action: PayloadAction<string>) => {
      const newState = state.favouriteItems.filter((item) => item !== action.payload);

      localStorage.setItem("favourite", JSON.stringify(newState));
      state.favouriteItems = newState;
    },
    loadFavouriteItems: (state) => {
      const { items, favouriteItems } = state;
      const fav = favouriteItems.reduce((acc, favItemName) => {
        const favItemIsInEq = items[1].assets.find((item) => item.market_name === favItemName);

        if (favItemIsInEq) {
          acc.push(favItemIsInEq);
        }

        return acc;
      }, [] as EquipmentModel["assets"]);

      state.pickedItems = fav;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadProfile.pending, (state) => {
      state.items = [];
      state.pickedItems = [];

      state.pending = true;
      state.error = false
    });

    builder.addCase(loadProfile.fulfilled, (state, action) => {
      const { proxyData, currenciesData } = action.payload;

      state.items = proxyData;
      state.currencies = currenciesData;

      state.pending = false;
      state.error = false;
    });

    builder.addCase(loadProfile.rejected, (state) => {
      state.items = [];
      state.pickedItems = [];

      state.pending = false
      state.error = true;
    });

    builder.addCase(loadMarketData.pending, (state) => {
      state.pickedItems = state.pickedItems.map((item) => {
        item.market_price = null;
        item.volume = null;
        item.price_history = null;

        return item;
      });
    });

    builder.addCase(loadMarketData.fulfilled, (state, action) => {
      const data = action.payload;

      state.pickedItems = state.pickedItems.map((item, idx) => {
        const isSuccess = data[idx]?.success;

        item.market_price = isSuccess ? data[idx].lowest_price : "Not marketable";
        item.volume = isSuccess ? data[idx].volume : "Not marketable";
        item.price_history = data[idx].price_history.success ? data[idx].price_history : undefined;

        return item;
      });
    });

    builder.addCase(loadMarketData.rejected, (state) => {
      state.pickedItems = state.pickedItems.map((item) => {
        item.market_price = undefined;
        item.volume = undefined;
        item.price_history = undefined;

        return item;
      });
    });
  },
});

export const {
  addToPickedItems,
  removeFromPickedItems,
  addToFavouriteItems,
  removeFromFavouriteItems,
  loadFavouriteItems,
} = profileSlice.actions;
export default profileSlice.reducer;
