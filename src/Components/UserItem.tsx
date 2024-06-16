import { useMemo, useState } from "react";
import { ItemModel } from "../models/ItemsModel";
import Area from "./Area";
import Price from "./Price";

type PropTypes = {
  item: ItemModel;
  setPickedItems: React.Dispatch<React.SetStateAction<ItemModel[]>>;
  isSelected: boolean;
};

function UserItem(props: PropTypes) {
  const { item, isSelected, setPickedItems } = props;
  const { market_name, color, name, icon_url, market_price, price_history, classid } = item;
  const isCase = /case|capsule/gim.test(name);

  const [isSaved, setIsSaved] = useState(false);

  const savedPrice = useMemo(() => {
    const storagePrice = localStorage.getItem(`${classid}`);

    if (storagePrice) return parseFloat(storagePrice);

    return 0.03;
  }, [isSaved]);

  const [targetPrice, setTargetPrice] = useState(savedPrice);

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

  function changeTargetPrice(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const selectedPrice = parseFloat(value);

    if (selectedPrice < 0) {
      setTargetPrice(0.03);
    } else if (selectedPrice > 999) {
      setTargetPrice(999);
    } else {
      setTargetPrice(selectedPrice);
    }
  }

  function save() {
    localStorage.setItem(`${classid}`, `${targetPrice}`);
    setIsSaved((prev) => !prev);
  }

  // const tax = targetPrice * 0.13;
  // const targetReturnsBrutto = targetPrice + tax;
  // const targetReturnsNetto = targetPrice - parseFloat(market_price?.replace("$", ""));

  // console.log(targetReturnsNetto, tax, targetReturnsBrutto);

  const tax = Math.max(0.01, targetPrice * 0.15);
  const priceOnMarketShouldBe = targetPrice + tax;
  const profit = parseFloat(market_price?.replace("$", "")) - priceOnMarketShouldBe;

  const marketPrice = parseFloat(market_price?.replace("$", ""));
  const iGetFromCurrentPrice = parseFloat((marketPrice * 0.8696).toFixed(2));

  // console.log(
  //   "customer will pay: ",
  //   targetPrice,
  //   "i will get: ",
  //   priceOnMarketShouldBe,
  //   "my profit is: ",
  //   profit,
  //   "tax is: ",
  //   tax
  // );

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
        <p className="item-price">Price On Market Should Be: $ {priceOnMarketShouldBe.toFixed(2)}</p>

        <div>
          From that price on market I get: $
          <input
            style={{ padding: "5px" }}
            type="number"
            min={0.03}
            max={999}
            step={0.01}
            value={targetPrice}
            onChange={changeTargetPrice}
          />
        </div>

        <p className="item-price">Current price on market is: {market_price}</p>
        <p className="item-price">From that current price I get: $ {iGetFromCurrentPrice}</p>


        <p className="item-price">Current market difference is: $ {profit.toFixed(2)}</p>
        <p className="item-price">
          Currently I can get more: $ {(iGetFromCurrentPrice - targetPrice).toFixed(2)}
        </p>
        <button onClick={save} disabled={savedPrice === targetPrice}>
          Save
        </button>
      </Price>

      {price_history ? <Area data={price_history.prices} /> : null}
    </li>
  );
}

export default UserItem;
