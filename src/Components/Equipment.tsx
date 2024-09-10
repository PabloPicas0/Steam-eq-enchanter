import { useMemo, useState } from "react";
import "../styles/Equipment.css";

import UserItem from "./UserItem";

import { EquipmentModel } from "../models/EquipmentModel";
import { ItemModel } from "../models/ItemsModel";
import { MarketModel } from "../models/MarketModel";
import { CurrencyTableModel } from "../models/CurrencyModel";

import usePagination from "../hooks/usePagination";
import useFiter from "../hooks/useFilter";
import Filter from "./Filter";

import getCorrectItemCurrency from "../utils/getCorrectItemCurrency";

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
  const { pagination, setPagination, moveBackwards, moveForeword } = usePagination(filteredItems.length);

  const currenciesCodes = currencies[0].rates.map((rate) => rate.code);
  const pickedCurrencyData = currencies[0].rates.find((rate) => rate.code === currencyCode);
  const itemsWithCorrecetedCurrency = useMemo(
    () => getCorrectItemCurrency(pickedItems, pickedCurrencyData),
    [pickedItems, currencyCode]
  );
  const { start, end } = pagination;

  async function getMarketData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setPickedItems((prev) => {
      return prev.map((item) => {
        item.market_price = null;
        item.volume = null;
        item.price_history = null;

        return item;
      });
    });

    const itemsMarketName = pickedItems.map((item) => item.market_name);
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemsMarketName),
    });
    const data = (await response.json()) as MarketModel[];

    setPickedItems((prev) => {
      return prev.map((item, idx) => {
        const isSuccess = data[idx]?.success;

        item.market_price = isSuccess ? data[idx].lowest_price : "Not marketable";
        item.volume = isSuccess ? data[idx].volume : "Not marketable";
        item.price_history = data[idx].price_history.success ? data[idx].price_history : undefined;

        return item;
      });
    });
  }

  return (
    <section className="equipment">
      <div>
        <h2>Selected items: {pickedItems.length}/10</h2>

        {pickedItems.length ? (
          <>
            <ul className="items-container selected-items-container">
              {itemsWithCorrecetedCurrency.map((item) => {
                return (
                  <UserItem
                    key={item.classid}
                    item={item}
                    setPickedItems={setPickedItems}
                    isSelected={true}
                  />
                );
              })}
            </ul>

            <form method="POST">
              <button type="submit" onClick={getMarketData}>
                Get Market Data
              </button>
            </form>
          </>
        ) : null}
      </div>

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

      <ul className="items-container">
        {filteredItems.slice(start, end).map((item) => {
          return (
            <UserItem key={item.market_name} item={item} setPickedItems={setPickedItems} isSelected={false} />
          );
        })}
      </ul>

      <div className="pagination">
        <button onClick={() => setPagination(moveBackwards)}>Back</button>

        {`${start} / ${end} of ${filteredItems.length}`}

        <button onClick={() => setPagination(moveForeword)}>Next</button>
      </div>
    </section>
  );
}

export default Equipment;
