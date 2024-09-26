import { useMemo, useState } from "react";
import "../styles/Equipment.css";

import { EquipmentModel } from "../models/EquipmentModel";
import { ItemModel } from "../models/ItemsModel";
import { CurrencyTableModel } from "../models/CurrencyModel";

import useFiter from "../hooks/useFilter";
import Filter from "./Filter";

import getCorrectItemCurrency from "../utils/getCorrectItemCurrency";
import EquipmentItems from "./EquipmentItems";
import EquipmentPickedItems from "./EquipmentPickedItems";

type PropTypes = {
  items: EquipmentModel;
  currencies: CurrencyTableModel;
};

function Equipment(props: PropTypes) {
  const { items, currencies } = props;

  const [pickedItems, setPickedItems] = useState<ItemModel[]>([]);
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
      <EquipmentPickedItems
        pickedItems={pickedItems}
        itemsWithCorrecetedCurrency={itemsWithCorrecetedCurrency}
        setPickedItems={setPickedItems}
      />

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

      <EquipmentItems filteredItems={filteredItems} setPickedItems={setPickedItems} />
    </section>
  );
}

export default Equipment;
