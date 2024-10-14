import "../../styles/MarketItemsSearch.css";
import "../../styles/Loader.css"
import MarketItems from "./MarketItems";

import MarketSearchBar from "./MarketSearchBar";

// TODO: Lack of fetching error validation for user
// TODO: Currency needs to match with this in eq
function Market() {
  return (
    <section>
      <MarketSearchBar />
      <MarketItems />
    </section>
  );
}

export default Market;
