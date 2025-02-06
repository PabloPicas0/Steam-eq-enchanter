import "../../styles/UserItem.css";

import Favourite from "./Favourite";

import AmmountIcon  from "../../Icons/AmmountIcon.svg";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToPickedItems, removeFromPickedItems } from "../../Store/Slices/profileSlice";
import { EquipmentModel } from "../../models/EquipmentModel";

type PropTypes = {
  item: EquipmentModel["assets"][0];
  isSelected: boolean;
};

const caseRegex = /case|capsule/gim;

function UserItem(props: PropTypes) {
  const { item, isSelected } = props;
  const { market_name, color, name, icon_url, amount } = item;

  const isCase = caseRegex.test(name);

  const dispatch = useAppDispatch();

  return (
      <div>
        <div className="item-ammount">
          <Favourite className="item-favourite" itemName={market_name} />
          <img src={AmmountIcon} />
          {amount}
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch(
              isSelected ? removeFromPickedItems(market_name) : addToPickedItems({ market_name, item })
            )
          }>
          <div className="item-image-wrapper">
            <img
              src={`https://steamcommunity-a.akamaihd.net/economy/image//${icon_url}`}
              className="item-image"
            />
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
              <p className="item-category">
                {market_name.replace(/^[^()]*()/g, "").replace(/[\\(\\)]/g, "")}
              </p>
            )}
          </div>
        </div>
      </div>
  );
}

export default UserItem;
