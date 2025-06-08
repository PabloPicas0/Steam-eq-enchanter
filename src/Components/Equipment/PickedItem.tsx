import { memo, useCallback, useMemo } from "react";

import { ItemModel } from "../../models/ItemsModel";

import usePrice from "../../hooks/usePrice";

import getSavedItemProps from "../../utils/getSavedItemProps";
import saveToStorage from "../../utils/saveToStorage";

import Area from "../Area";
import Price from "../Price";
import PriceSummary from "../PriceSummary";
import UserItem from "./UserItem";

function PickedItem(props: { item: ItemModel }) {
  const { item } = props;
  const { color, market_price, price_history, classid } = item;

  const priceSuffix = price_history?.price_suffix;

  const savedPrice = useMemo(() => getSavedItemProps(classid), []);
  const { targetPrice, sellProfit, buyProfit, iGetFromCurrentMarketPrice, setTargetPrice } = usePrice({
    savedPrice,
    market_price,
  });

  const setNewPrice = useCallback((e: number) => {
    if (e < 0) {
      setTargetPrice(0.03);
    } else if (e > 99999) {
      setTargetPrice(99999);
    } else {
      setTargetPrice(e);
    }

    saveToStorage(classid, e);
  }, []);

  return (
    <li className="item scale-up" style={{ borderColor: `#${color}` }}>
      <UserItem item={item} isSelected={true} />

      <Price price={market_price} fallback={<div className="skeleton-text" />}>
        <PriceSummary
          market_price={market_price as string}
          priceSuffix={priceSuffix}
          buyProfit={buyProfit}
          sellProfit={sellProfit}
          iGetFromCurrentPrice={iGetFromCurrentMarketPrice}
          ammount={item.amount}
        />
      </Price>

      {price_history ? <Area data={price_history.prices} setNewPrice={setNewPrice} targetPrice={targetPrice} /> : null}
    </li>
  );
}

export default memo(PickedItem);
