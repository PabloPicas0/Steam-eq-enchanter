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
  const { market_name, color, name, icon_url, market_price, volume, price_history } = item;
  const isCase = /case|capsule/gim.test(name);

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

  return (
    <li
      className="item"
      style={{
        color: "#fafafa",
        borderColor: `#${color}`,
      }}
      onClick={() => setPickedItems(isSelected ? removeFromPickedItems : addToPickedItems)}>
      <div className="item-image-wrapper">
        <img src={` http://cdn.steamcommunity.com/economy/image/${icon_url}`} className="item-image" />
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

      <Price price={market_price} fallback={<div className="skeleton-text" />}>
        <p className="item-price">{market_price}</p>
      </Price>

      <Price price={price_history} fallback={<div className="skeleton-text" />}>
        <p>its working !</p>
      </Price>

      {price_history ? <Area data={price_history.prices} /> : null}
    </li>
  );
}

export default UserItem;
