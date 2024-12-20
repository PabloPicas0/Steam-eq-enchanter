import "../../styles/MarketItemsSearch.css";
import "../../styles/Loader.css";

import MarketItems from "./MarketItems";

import MarketSearchBar from "./MarketSearchBar";

// TODO: Currency needs to match with this in eq
function Market() {
  return (
    <section className="equipment">
      <MarketSearchBar />
      <MarketItems />
    </section>
  );
}

export default Market;
