import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrencyTableModel } from "../../models/CurrencyModel";
import { EquipmentModel } from "../../models/EquipmentModel";
import { UserModel } from "../../models/UserModel";
import { parseSteamId32, parseSteamId64 } from "../../utils/parseSteamID";

export const loadProfile = createAsyncThunk(
  "profile/loadProfile",
  async (input: string, { rejectWithValue }) => {
    const steam64ID = /STEAM_/g.test(input) ? parseSteamId32(input) : parseSteamId64(input);
    const nbpCurrency = "https://api.nbp.pl/api/exchangerates/tables/a/";
    const headers = {
      headers: { Accept: "application/json" },
    };

    try {
      const [proxyResponse, currenciesResponse] = await Promise.all([
        fetch(`/api?id=${steam64ID}`),
        fetch(nbpCurrency, headers),
      ]);

      const [proxyData, currenciesData] = (await Promise.all([
        proxyResponse.json(),
        currenciesResponse.json(),
      ])) as [(UserModel & EquipmentModel)[], CurrencyTableModel];

      return { proxyData, currenciesData };
    } catch (error) {
      return rejectWithValue(true);
    }
  }
);
