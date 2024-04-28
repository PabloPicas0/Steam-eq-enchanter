import { useState } from "react";

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

  const regex = new RegExp(filter, "gmi");
  const filteredItems = items.assets.filter((item) => regex.test(item.name));

  const [pagination, setPagination] = useState({
    start: 0,
    end: filteredItems.length < 54 ? filteredItems.length : 54,
  });

  if (
    pagination.end > filteredItems.length ||
    (pagination.end < filteredItems.length && pagination.end !== 54)
  ) {
    setPagination({ start: 0, end: filteredItems.length < 54 ? filteredItems.length : 54 });
  }

  const { start, end } = pagination;

  return (
    <section className="equipment">
      <div style={{ color: "white" }}>
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
        {items.assets
          .filter((item) => regex.test(item.name))
          .slice(start, end)
          .map((item, idx) => {
            return (
              <li key={idx} style={{ color: "#fafafa" }}>
                <img
                  src={` http://cdn.steamcommunity.com/economy/image/${item.icon_url}`}
                  width={50}
                  height={50}
                />
                <p>{item.name}</p>
              </li>
            );
          })}
      </ul>

      <div className="pagination">
        <button
          onClick={() => {
            setPagination((prev) => {
              if (prev.start - 55 < 0) return prev;

              return { start: prev.start - 55, end: prev.start - 1 };
            });
          }}>
          Back
        </button>

        {pagination.start + " / " + pagination.end + " of " + filteredItems.length}

        <button
          onClick={() =>
            setPagination((prev) => {
              if (prev.end === filteredItems.length) return prev;

              if (prev.end + 55 > filteredItems.length)
                return { start: prev.end + 1, end: filteredItems.length };

              return { start: prev.end + 1, end: prev.end + 55 };
            })
          }>
          Next
        </button>
      </div>
    </section>
  );
}

export default Equipment;
