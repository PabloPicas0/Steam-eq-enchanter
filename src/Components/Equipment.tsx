import { useState } from "react";
import "../styles/Equipment.css";

import useFiter from "../hooks/useFilter";

import EquipmentItems from "./EquipmentItems";
import EquipmentPickedItems from "./EquipmentPickedItems";

import FilterQuality from "./FilterQuality";
import HeartIcon from "../Icons/Heartcon";

import { useAppSelector } from "../hooks/useAppSelector ";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loadFavouriteItems } from "../Store/Slices/profileSlice";
import FilterFavourite from "./FilterFavourite";

function Equipment() {
  const items = useAppSelector((state) => state.profile.items[1]);
  const currencies = useAppSelector((state) => state.profile.currencies);

  const [currencyCode, setCurrencyCode] = useState("USD");
  const {
    filteredItems,
    nameFilter,
    sortAscending,
    qualityFilter,
    setNameFilter,
    setSortAscending,
    setQualityFilter,
  } = useFiter(items);

  const dispatch = useAppDispatch();

  const currenciesCodes = currencies[0].rates.map((rate) => rate.code);
  const pickedCurrencyData = currencies[0].rates.find((rate) => rate.code === currencyCode);

  return (
    <section className="equipment">
      <EquipmentPickedItems currencyCode={currencyCode} pickedCurrencyData={pickedCurrencyData} />

      <div>
        <h2>Total unique items: {filteredItems.length}</h2>

        <div className="inputs-wrapper">
          <input
            className="input-steamID input-filter-equipment"
            type="text"
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value.replace("\\", ""));
            }}
            placeholder="Search"
          />

          <button
            title={`Sorted ${sortAscending ? "ascending" : " descending"}`}
            className="sort-btn"
            onClick={() => setSortAscending((prev) => !prev)}>
            Sort {sortAscending ? "\u2191" : "\u2193"}
          </button>

          <FilterQuality qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} />
          <FilterFavourite />

          <select
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
            className="currency-select">
            <option value={"PLN"}>PLN</option>
            {currenciesCodes.map((currCode) => {
              return (
                <option key={currCode} value={currCode}>
                  {currCode}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <EquipmentItems filteredItems={filteredItems} />
    </section>
  );
}

export default Equipment;
