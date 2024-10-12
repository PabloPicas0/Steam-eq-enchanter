import { useState } from "react";

import "../styles/MarketItemsSearch.css";
import { useAppSelector } from "../hooks/useAppSelector ";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loadItemFromMarket } from "../Store/Thunks/loadItemFromMarketThunk";

// TODO: Lack of fetching error validation for user
function MarketItemsSearch() {
  const items = useAppSelector((state) => state.itemsFromMarket.marketItems);

  const [link, setLink] = useState("");

  const dispatch = useAppDispatch();

  async function addAdditionalItem() {
    if (link === "") return;

    try {
      await dispatch(loadItemFromMarket(link)).unwrap();
    } catch (error) {
      return addAdditionalItem();
    }
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
          const { icon_url, classid } = item.results[0].asset_description;

          return (
            <div style={{ color: "whitesmoke" }} key={classid + idx}>
              <img src={`https://steamcommunity-a.akamaihd.net/economy/image//${icon_url}`} />
              <p>item {item.results[0]?.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MarketItemsSearch;
