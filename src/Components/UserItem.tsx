import { ItemTypes } from "./Equipment";

type PropTypes = {
  item: ItemTypes;
  setPickedItems: React.Dispatch<React.SetStateAction<ItemTypes[]>>;
  isSelected: boolean;
};

function UserItem(props: PropTypes) {
  const { item, isSelected, setPickedItems } = props;
  const { market_name, color, name, icon_url } = item;

  function addToPickedItems(prev: ItemTypes[]) {
    const pickedItemName = market_name;
    const itemExists = prev.some((item) => item.market_name === pickedItemName);

    if (itemExists) return prev;

    return [...prev, item];
  }

  function removeFromPickedItems(prev: ItemTypes[]) {
    const pickedItemName = market_name;
    const newItems = prev.filter((item) => item.market_name !== pickedItemName);

    return newItems;
  }

  return (
    <li
      className="item"
      key={market_name}
      style={{
        color: "#fafafa",
        borderColor: `#${color}`,
      }}
      onClick={() => setPickedItems(isSelected ? removeFromPickedItems : addToPickedItems)}>
      <img src={` http://cdn.steamcommunity.com/economy/image/${icon_url}`} width={50} height={50} />

      <div className="item-description">
        <p className="item-name" style={{ color: `#${color}` }}>
          {name.replace(/\|.*$/g, "")}
        </p>

        {/* check if the items are cases and if yes don't display it */}
        {name.toLowerCase().includes("case") ? null : (
          <p className="item-skin">{name.replace(/^[^\|]*\|/g, "")}</p>
        )}
        {name.toLowerCase().includes("case") ? null : (
          <p className="item-category">{market_name.replace(/^[^()]*()/g, "").replace(/[\\(\\)]/g, "")}</p>
        )}
      </div>
    </li>
  );
}

export default UserItem;
