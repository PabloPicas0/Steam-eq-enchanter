import { useState } from "react";

type ItemTypes = {
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
  const [pickedItems, setPickeditems] = useState<ItemTypes[]>([]);

  const regex = new RegExp(filter, "gmi");
  const filteredItems = items.assets.filter((item) => regex.test(item.name));

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

  return (
    <section className="equipment">
      <div style={{ color: "white" }}>
        <h2>Total unique items: {filteredItems.length}</h2>

        <ul className="items-container">
          {pickedItems.map((item) => {
            const { name } = item;
            return <li>{name}</li>;
          })}
        </ul>

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
          const { color, icon_url, name, market_name } = item;

          return (
            <li
              className="item"
              key={market_name}
              style={{ color: "#fafafa", borderColor: `#${color}` }}
              onClick={() =>
                setPickeditems((prev) => {
                  const pickedItemName = name;
                  const itemExists = prev.some((item) => item.name === pickedItemName);

                  if (itemExists) return prev;

                  return [...prev, item];
                })
              }>
              <img src={` http://cdn.steamcommunity.com/economy/image/${icon_url}`} width={50} height={50} />

              <div className="item-description">
                <p className="item-name" style={{ color: `#${color}` }}>
                  {name.replace(/\|.*$/g, "")}
                </p>

                {/* check if the items are cases and if yes dont display it */}
                {name.toLowerCase().includes("case") ? null : (
                  <p className="item-skin">{name.replace(/^[^\|]*\|/g, "")}</p>
                )}
                {name.toLowerCase().includes("case") ? null : (
                  <p className="item-category">
                    {market_name.replace(/^[^()]*()/g, "").replace(/[\\(\\)]/g, "")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button
          onClick={() => {
            setPagination((prev) => {
              if (prev.start - 56 < 0) return prev;

              return { start: prev.start - 56, end: prev.start - 1 };
            });
          }}>
          Back
        </button>

        {pagination.start + " / " + pagination.end + " of " + filteredItems.length}

        <button
          onClick={() =>
            setPagination((prev) => {
              if (prev.end === filteredItems.length) return prev;

              if (prev.end + 56 > filteredItems.length)
                return { start: prev.end + 1, end: filteredItems.length };

              return { start: prev.end + 1, end: prev.end + 56 };
            })
          }>
          Next
        </button>
      </div>
    </section>
  );
}

export default Equipment;
