import { useMemo, useState } from "react";
import "../styles/Equipment.css";

import UserItem from "./UserItem";

import { EquipmentModel } from "../models/EquipmentModel";
import { ItemModel } from "../models/ItemsModel";
import { MarketModel } from "../models/MarketModel";
import usePagination from "../hooks/usePagination";

type PropTypes = {
  items: EquipmentModel;
};

function Equipment(props: PropTypes) {
  const { items } = props;

  const [filter, setFilter] = useState("");
  const [pickedItems, setPickedItems] = useState<ItemModel[]>([]);

  const regex = new RegExp(filter, "gmi");
  const filteredItems = useMemo(() => items.assets.filter((item) => regex.test(item.name)), [filter]);

  const { pagination, setPagination, moveBackwards, moveForeword } = usePagination(filteredItems.length);
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
    const data: MarketModel[] = await response.json();

    setPickedItems((prev) => {
      return prev.map((item, idx) => {
        item.market_price = data[idx]?.success ? data[idx].lowest_price : "Unable to find price";
        item.volume = data[idx]?.success ? data[idx].volume : "Unable to find volume";
        item.price_history = data[idx].price_history.success ? data[idx].price_history : undefined;

        return item;
      });
    });
  }

  return (
    <section className="equipment">
      <div>
        <h2>Selected items: {pickedItems.length}</h2>

        {pickedItems.length ? (
          <>
            <ul className="items-container selected-items-container">
              {pickedItems.map((item) => {
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

        <input
          className="input-steamID input-filter-equipment"
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value.replace("\\", ""));
          }}
          placeholder="Search"
        />
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
