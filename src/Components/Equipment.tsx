import { useMemo, useState } from "react";
import UserItem from "./UserItem";

export type ItemTypes = {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
  name: string;
  icon_url: string;
  market_name: string;
  type: string;
  color: string;
  market_price?: undefined | null | string;
};

type PropTypes = {
  items: {
    assets: {
      appid: number;
      contextid: string;
      assetid: string;
      classid: string;
      instanceid: string;
      amount: string;
      name: string;
      icon_url: string;
      market_name: string;
      type: string;
      color: string;
    }[];
    descriptions: {
      appid: number;
      classid: string;
      instanceid: string;
      currency: number;
      background_color: string;
      icon_url: string;
      descriptions: {
        type: string;
        value: string;
      }[];
      tradable: number;
      actions: {
        link: string;
        name: string;
      }[];

      name: string;
      name_color: string;
      type: string;
      market_name: string;
      market_hash_name: string;
      market_actions: {
        link: string;
        name: string;
      }[];

      commodity: number;
      market_tradable_restriction: number;
      marketable: number;
      tags: {
        category: string;
        internal_name: string;
        localized_category_name: string;
        localized_tag_name: string;
      }[];
    }[];
    rwgrsn: number;
    success: number;
    total_inventory_count: number;
  };
};

function Equipment(props: PropTypes) {
  const { items } = props;

  const [filter, setFilter] = useState("");
  const [pickedItems, setPickedItems] = useState<ItemTypes[]>([]);

  const regex = new RegExp(filter, "gmi");
  const filteredItems = useMemo(() => items.assets.filter((item) => regex.test(item.name)), [filter]);

  const [pagination, setPagination] = useState({
    start: 0,
    end: filteredItems.length < 55 ? filteredItems.length : 55,
  });

  if (
    pagination.end > filteredItems.length ||
    (pagination.end < filteredItems.length && pagination.end !== 55)
  ) {
    setPagination({ start: 0, end: filteredItems.length < 55 ? filteredItems.length : 55 });
  }

  const { start, end } = pagination;

  function moveBackwards(prev: { start: number; end: number }) {
    if (prev.start - 56 < 0) return prev;

    return { start: prev.start - 56, end: prev.start - 1 };
  }

  function moveForeword(prev: { start: number; end: number }) {
    if (prev.end === filteredItems.length) return prev;

    if (prev.end + 56 > filteredItems.length) return { start: prev.end + 1, end: filteredItems.length };

    return { start: prev.end + 1, end: prev.end + 56 };
  }

  // TODO: add error handling
  async function getMarketData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    setPickedItems((prev) => {
      return prev.map((item) => {
        item.market_price = null;

        return item;
      });
    });

    const itemsMarketName = pickedItems.map((item) => item.market_name);
    const response = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemsMarketName),
    });
    const data = await response.json();

    console.log(data);
    setPickedItems((prev) => {
      return prev.map((item, idx) => {
        item.market_price = data[idx].results[0]?.sell_price_text || "unable to find price";

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
            <ul className="items-container" style={{ margin: "0 0 20px 0" }}>
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
          onChange={(e) => setFilter(e.target.value)}
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

        {pagination.start + " / " + pagination.end + " of " + filteredItems.length}

        <button onClick={() => setPagination(moveForeword)}>Next</button>
      </div>
    </section>
  );
}

export default Equipment;
