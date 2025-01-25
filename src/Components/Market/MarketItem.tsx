import { useMemo } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import usePrice from "../../hooks/usePrice";

import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { removeMarketitem } from "../../Store/Slices/itemsFromMarketSlice";

import Area from "../Area";
import Price from "../Price";
import PriceSummary from "../PriceSummary";

import getSavedItemProps from "../../utils/getSavedItemProps";
import saveToStorage from "../../utils/saveToStorage";

function MarketItem(props: { item: AdditionalItemModel }) {
  const { item } = props;

  const { sell_price_text, price_history } = item.results[0];
  const { icon_url, classid, name, name_color } = item.results[0].asset_description;

  const priceSuffix = price_history?.price_suffix;
  const market_price = sell_price_text.replace(/,(?=[^,]*$)/, "");

  const savedPrice = useMemo(() => getSavedItemProps(classid), []);
  const { targetPrice, sellProfit, buyProfit, iGetFromCurrentMarketPrice, setTargetPrice } = usePrice({
    savedPrice,
    market_price,
  });

  function setNewPrice(e: number) {
    if (e < 0) {
      setTargetPrice(0.03);
    } else if (e > 99999) {
      setTargetPrice(99999);
    } else {
      setTargetPrice(e);
    }

    saveToStorage(classid, targetPrice);
  }

  const dispatch = useAppDispatch();

  return (
    <li className="item" style={{ border: `1px solid #${name_color}` }}>
      <div className="item-from-market">
        <div onClick={() => dispatch(removeMarketitem(classid))} style={{ cursor: "pointer" }}>
          <div className="item-image-wrapper">
            <img
              src={`https://steamcommunity-a.akamaihd.net/economy/image//${icon_url}`}
              width={100}
              height={100}
            />
          </div>

          <div className="item-description">
            <p className="item-name">{name}</p>
          </div>
        </div>

        <Price price={market_price} fallback={<div className="skeleton-text" />}>
          <PriceSummary
            buyProfit={buyProfit}
            iGetFromCurrentPrice={iGetFromCurrentMarketPrice}
            market_price={market_price}
            sellProfit={sellProfit}
            priceSuffix={priceSuffix}
          />
        </Price>
      </div>

      {price_history ? (
        <Area data={price_history.prices} targetPrice={targetPrice} setNewPrice={setNewPrice} />
      ) : null}
    </li>
  );
}

export default MarketItem;
