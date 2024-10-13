import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loadItemFromMarket } from "../Store/Thunks/loadItemFromMarketThunk";

function MarketSearchBar() {
  const [link, setLink] = useState("");

  const dispatch = useAppDispatch();

  return (
    <div className="search-additional-item-container">
      {" "}
      <label htmlFor="additional-item" className="search-additional-item-label">
        Search from steam market
      </label>
      <input
        type="text"
        className="input-steamID"
        id="additional-item"
        placeholder="Item URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        className="search-additional-item-btn"
        onClick={() => link !== "" && dispatch(loadItemFromMarket(link))}>
        Search
      </button>
    </div>
  );
}

export default MarketSearchBar;
