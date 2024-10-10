import { useState } from "react";
import { AdditionalItemModel } from "../models/AdditionalItemModel";

import "../styles/MarketItemsSearch.css";

// TODO: Lack of fetching error validation for user
function MarketItemsSearch() {
  const [link, setLink] = useState("");

  async function addAdditionalItem() {
    if (link === "") return;

    const linksParts = link.split("/");
    const lastPart = linksParts.length - 1;
    const itemName = linksParts[lastPart];

    const req = await fetch(`/api/item/${itemName}`);

    if (!req.ok) console.error(req.statusText);

    const item = (await req.json()) as AdditionalItemModel;

    console.log(item);
  }

  return (
    <div className="search-additional-item-container">
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
  );
}

export default MarketItemsSearch;
