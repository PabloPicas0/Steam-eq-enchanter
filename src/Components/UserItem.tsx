import { ItemModel } from "../models/ItemsModel";

import Area from "./Area";
import Price from "./Price";

import useSavedPrice from "../hooks/useSavedPrice";
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

  const [savedPrice, setSavedPrice] = useSavedPrice(classid);
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
  }

  function save() {
    localStorage.setItem(`${classid}`, `${targetPrice}`);
    setSavedPrice((prev) => !prev);
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
        {/* <p className="item-price">Item price on market should be: {priceOnMarketShouldBe}</p> */}

        {/* <div>
          I get:
          <input
            style={{ padding: "5px" }}
            type="number"
            min={0.03}
            max={999}
            step={0.01}
            value={targetPrice}
            onChange={changeTargetPrice}
          />
        </div> */}

        <p>Sell profit: {sellProfit}</p>
        <p>Buy Profit: {buyProfit}</p>

        {/* 
        <p className="item-price">Current price on market is: {market_price}</p>
        <p className="item-price">From that current price I get: $ {iGetFromCurrentPrice}</p>

        <p className="item-price">Current market difference is: $ {profit}</p>
        <p className="item-price">
          Currently I can get more: $ {(iGetFromCurrentPrice - targetPrice)}
        </p> */}

        {/* <button onClick={save} disabled={savedPrice === targetPrice}>
          Save
        </button> */}
      </Price>

      {price_history ? <Area data={price_history.prices} changeTargetPrice={changeTargetPrice} /> : null}
    </li>
  );
}

export default UserItem;
