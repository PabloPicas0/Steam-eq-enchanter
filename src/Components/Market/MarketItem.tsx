import { useMemo } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import usePrice from "../../hooks/usePrice";

import { AdditionalItemModel } from "../../models/AdditionalItemModel";
import { removeMarketitem } from "../../Store/Slices/itemsFromMarketSlice";

import Area from "../Area";
import Price from "../Price";

import getSavedItemProps from "../../utils/getSavedItemProps";
import saveToStorage from "../../utils/saveToStorage";

function MarketItem(props: { item: AdditionalItemModel }) {
  const { item } = props;

  const { sell_price_text, price_history } = item.results[0];
  const { icon_url, classid, name, name_color } = item.results[0].asset_description;

  const priceSuffix = price_history?.price_suffix

  const savedPrice = useMemo(() => getSavedItemProps(classid), []);
  const { targetPrice, sellProfit, buyProfit, setTargetPrice } = usePrice({
    savedPrice,
    market_price: sell_price_text,
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
      <div className="item-from-market" onClick={() => dispatch(removeMarketitem(classid))}>
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

        <Price price={sell_price_text} fallback={<div className="skeleton-text" />}>
          <p>
            Current price: {sell_price_text} {priceSuffix}
          </p>

          <p>
            Sell profit: {sellProfit} {priceSuffix}
          </p>

          <p>
            Buy Profit: {buyProfit} {priceSuffix}
          </p>
        </Price>
      </div>

      {price_history ? (
        <Area data={price_history.prices} targetPrice={targetPrice} setNewPrice={setNewPrice} />
      ) : null}
    </li>
  );
}

export default MarketItem;
