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
  const { targetPrice, iGetFromCurrentPrice, priceOnMarketShouldBe, profit, setTargetPrice } = usePrice({
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
        <p className="item-price">Price On Market Should Be: $ {priceOnMarketShouldBe}</p>

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

        <p className="item-price">Current market difference is: $ {profit}</p>
        <p className="item-price">
          Currently I can get more: $ {(iGetFromCurrentPrice - targetPrice)}
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
