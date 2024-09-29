import { useMemo, useState } from "react";
import "../styles/Equipment.css";

import useFiter from "../hooks/useFilter";

import getCorrectItemCurrency from "../utils/getCorrectItemCurrency";
import EquipmentItems from "./EquipmentItems";
import EquipmentPickedItems from "./EquipmentPickedItems";
import Filter from "./Filter";
import HeartIcon from "../Icons/Heartcon";
import { useAppSelector } from "../hooks/useAppSelector ";

function Equipment() {
  const items = useAppSelector((state) => state.profile.items[1]);
  const currencies = useAppSelector((state) => state.profile.currencies);
  const pickedItems = useAppSelector((state) => state.profile.pickedItems);

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

  const currenciesCodes = currencies[0].rates.map((rate) => rate.code);
  const pickedCurrencyData = currencies[0].rates.find((rate) => rate.code === currencyCode);

  const itemsWithCorrecetedCurrency = useMemo(
    () => getCorrectItemCurrency(pickedItems, pickedCurrencyData),
    [pickedItems, currencyCode]
  );

  return (
    <section className="equipment">
      <EquipmentPickedItems itemsWithCorrecetedCurrency={itemsWithCorrecetedCurrency} />

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

          <Filter qualityFilter={qualityFilter} setQualityFilter={setQualityFilter} />

          <button title="Favourite" className="favourite-items filter-btn">
            Favourite
            <HeartIcon />
          </button>

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
