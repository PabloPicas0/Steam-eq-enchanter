import { useMemo } from "react";

import { ItemModel } from "../models/ItemsModel";

import Area from "./Area";
import Price from "./Price";

import usePrice from "../hooks/usePrice";

type PropTypes = {
  item: ItemModel;
  setPickedItems: React.Dispatch<React.SetStateAction<ItemModel[]>>;
  isSelected: boolean;
};

function UserItem(props: PropTypes) {
  const { item, isSelected, setPickedItems } = props;
  const { market_name, color, name, icon_url, market_price, price_history, classid } = item;
  const isCase = /case|capsule/gim.test(name);

  const savedPrice = useMemo(() => {
    const storagePrice = localStorage.getItem(`${classid}`);

    if (storagePrice) return parseFloat(storagePrice);

    return 0.03;
  }, []);

  const { targetPrice, sellProfit, buyProfit, setTargetPrice } = usePrice({
    savedPrice,
    market_price,
  });

  function addToPickedItems(prev: ItemModel[]) {
    const pickedItemName = market_name;
    const itemExists = prev.some((item) => item.market_name === pickedItemName);

    // Max items we want to have picked is 10
    if (itemExists || prev.length === 10) return prev;

    return [...prev, { ...item }];
  }

  function removeFromPickedItems(prev: ItemModel[]) {
    const pickedItemName = market_name;
    const newItems = prev.filter((item) => item.market_name !== pickedItemName);

    return newItems;
  }

  function changeTargetPrice(e: number) {
    if (e < 0) {
      setTargetPrice(0.03);
    } else if (e > 999) {
      setTargetPrice(999);
    } else {
      setTargetPrice(e);
    }

    save();
  }

  function save() {
    localStorage.setItem(`${classid}`, `${targetPrice}`);
  }

  return (
    <li
      className="item"
      style={{
        color: "#fafafa",
        borderColor: `#${color}`,
      }}>
      <div
        onClick={() => setPickedItems(isSelected ? removeFromPickedItems : addToPickedItems)}
        style={{ cursor: "pointer" }}>
        <div className="item-image-wrapper">
          <img src={`http://cdn.steamcommunity.com/economy/image/${icon_url}`} className="item-image" />
        </div>

        <div className="item-description">
          <p className="item-name">{name.replace(/\|.*$/g, "")}</p>

          {/* check if the items are cases and if yes don't display it */}
          {isCase ? null : (
            <p className="item-skin" style={{ color: `#${color}` }}>
              {name.replace(/^[^\|]*\|/g, "")}
            </p>
          )}

          {isCase ? null : (
            <p className="item-category">{market_name.replace(/^[^()]*()/g, "").replace(/[\\(\\)]/g, "")}</p>
          )}
        </div>
      </div>

      <Price price={market_price} fallback={<div className="skeleton-text" />}>
        <p>Current price: {market_price}</p>
        <p>Sell profit: {sellProfit}</p>
        <p>Buy Profit: {buyProfit}</p>
      </Price>

      {price_history ? (
        <Area data={price_history.prices} changeTargetPrice={changeTargetPrice} targetPrice={targetPrice} />
      ) : null}
    </li>
  );
}

export default UserItem;
