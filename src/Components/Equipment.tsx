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
      market_name: string;
      icon_url: string;
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

  const [pagination, setPagination] = useState({ start: 0, end: 54 });

  const { start, end } = pagination;

  return (
    <section className="equipment-container">
      <h2 style={{ gridColumn: "1 / -1", color: "white" }}>
        Total items in inventory {items.total_inventory_count}
      </h2>
      {items.assets.slice(start, end).map((item, idx) => {
        return (
          <div key={idx} style={{ color: "#fafafa" }}>
            <img
              src={` http://cdn.steamcommunity.com/economy/image/${item.icon_url}`}
              width={50}
              height={50}
            />
            <p>{item.market_name}</p>
          </div>
        );
      })}

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

        {pagination.start + " / " + pagination.end + " of " + items.total_inventory_count}

        <button
          onClick={() =>
            setPagination((prev) => {
              if (prev.end === items.total_inventory_count) return prev;

              if (prev.end + 55 > items.total_inventory_count)
                return { start: prev.end + 1, end: items.total_inventory_count };

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
