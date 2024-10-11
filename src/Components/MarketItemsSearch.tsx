import { useState } from "react";
import { AdditionalItemModel } from "../models/AdditionalItemModel";

import "../styles/MarketItemsSearch.css";
import { useAppSelector } from "../hooks/useAppSelector ";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addMarketItem } from "../Store/Slices/itemsFromMarketSlice";

// TODO: Lack of fetching error validation for user
function MarketItemsSearch() {
  const items = useAppSelector((state) => state.itemsFromMarket.marketItems);

  const [link, setLink] = useState("");

  const dispatch = useAppDispatch();

  async function addAdditionalItem() {
    if (link === "") return;

    const linksParts = link.split("/");
    const lastPart = linksParts.length - 1;
    const itemName = linksParts[lastPart];

    const req = await fetch(`/api/item/${itemName}`);

    if (!req.ok) {
      console.error(req.statusText);
      return addAdditionalItem()
    }

    const item = (await req.json()) as AdditionalItemModel;

    console.log(item);
    dispatch(addMarketItem(item));
  }

  return (
    <section>
      <div className="search-additional-item-container">
        {" "}
        <label htmlFor="additional-item" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Search from steam market
        </label>
        <input
          type="text"
          className="input-steamID"
          id="additional-item"
          placeholder="Search item"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button className="search-additional-item-btn" onClick={addAdditionalItem}>
          Search
        </button>
      </div>

      <div>
        {items.map((item, idx) => {
          return (
            <div style={{ color: "whitesmoke" }}>
              <img
                src={`https://steamcommunity-a.akamaihd.net/economy/image//${item.results[0]?.asset_description.icon_url}`}
              />
              <p>item {item.results[0]?.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MarketItemsSearch;
