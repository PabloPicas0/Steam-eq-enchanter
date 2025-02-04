import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector ";

import MarketItem from "./MarketItem";
import getCorrectMarketCurrency from "../../utils/getCorrectMarketCurrency";

function MarketItems() {
  const items = useAppSelector((state) => state.itemsFromMarket.marketItems);
  const currencies = useAppSelector((state) => state.profile.currencies);
  const pending = useAppSelector((state) => state.itemsFromMarket.pending);

  const [currencyCode] = useState("USD");

  const pickedCurrencyData = currencies[0].rates.find((rate) => rate.code === currencyCode);
  const itemsWithCorrecetedCurrency = useMemo(
    () => getCorrectMarketCurrency(items, pickedCurrencyData),
    [items, currencyCode]
  );

  return (
    <div>
      <h2 style={{ color: "white" }}>Items {items.length}/10</h2>

      <ul className="items-container selected-items-container">
        {itemsWithCorrecetedCurrency.map((item, idx) => {
          const { classid } = item.results[0].asset_description;

          return <MarketItem item={item} key={classid + idx} />;
        })}

        {pending && (
          <li style={{ placeSelf: "center" }}>
            <span className="loader"></span>{" "}
          </li>
        )}
      </ul>
    </div>
  );
}

export default MarketItems;
