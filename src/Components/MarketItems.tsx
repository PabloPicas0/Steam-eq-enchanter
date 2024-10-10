import { useState } from "react";
import { AdditionalItemModel } from "../models/AdditionalItemModel";

import "../styles/AdditionalItem.css";

// TODO: Lack of fetching error validation for user
function MarketItems() {
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
      <label htmlFor="additional-item">Search additional item</label>
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

export default MarketItems;
