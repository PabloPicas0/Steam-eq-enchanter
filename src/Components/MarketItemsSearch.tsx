import { useState } from "react";

import "../styles/MarketItemsSearch.css";

import { useAppSelector } from "../hooks/useAppSelector ";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loadItemFromMarket } from "../Store/Thunks/loadItemFromMarketThunk";

// TODO: Lack of fetching error validation for user
// TODO: Currency needs to match with this in eq
function MarketItemsSearch() {
  const items = useAppSelector((state) => state.itemsFromMarket.marketItems);

  const [link, setLink] = useState("");

  const dispatch = useAppDispatch();

  async function addAdditionalItem() {
    const linksParts = link.split("/");
    const lastPart = linksParts.length - 1;
    const itemName = decodeURIComponent(linksParts[lastPart]);

    if (link === "" || items.length === 10 || items.some((item) => item.results[0].hash_name === itemName))
      return;

    dispatch(loadItemFromMarket(itemName));
  }

  return (
    <section>
      <div className="search-additional-item-container">
        {" "}
        <label htmlFor="additional-item" className="search-additional-item-label">
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

      <div className="items-from-market-wrapper">
        {items.map((item, idx) => {
          const { sell_price_text } = item.results[0];
          const { icon_url, classid, name } = item.results[0].asset_description;

          return (
            <div className="item-from-market" key={classid + idx}>
              <img
                src={`https://steamcommunity-a.akamaihd.net/economy/image//${icon_url}`}
                width={100}
                height={100}
              />

              <div>
                <p>{name + " " + idx}</p>
                <p>{sell_price_text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default MarketItemsSearch;
