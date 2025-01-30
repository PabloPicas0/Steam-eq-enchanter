import { useMemo, useRef } from "react";

import "../../styles/UserItem.css";

import { ItemModel } from "../../models/ItemsModel";

import Area from "../Area";
import Price from "../Price";
import PriceSummary from "../PriceSummary";
import Favourite from "./Favourite";

import usePrice from "../../hooks/usePrice";
import useIsVisible from "../../hooks/useIsVisible";

import AmmountIcon from "../../Icons/AmmountIcon";

import getSavedItemProps from "../../utils/getSavedItemProps";
import saveToStorage from "../../utils/saveToStorage";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToPickedItems, removeFromPickedItems } from "../../Store/Slices/profileSlice";

type PropTypes = {
  item: ItemModel;
  isSelected: boolean;
};

function UserItem(props: PropTypes) {
  const { item, isSelected } = props;
  const { market_name, color, name, icon_url, market_price, price_history, classid, amount } = item;

  const isCase = /case|capsule/gim.test(name);
  const priceSuffix = price_history?.price_suffix;

  const savedPrice = useMemo(() => getSavedItemProps(classid), []);
  const { targetPrice, sellProfit, buyProfit, iGetFromCurrentMarketPrice, setTargetPrice } = usePrice({
    savedPrice,
    market_price,
  });

  const dispatch = useAppDispatch();

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

  return (
    <li className="item" style={{ borderColor: `#${color}` }}>
      <div>
        <div className="item-ammount">
          <Favourite className="item-favourite" itemName={market_name} />
          <AmmountIcon width={20} height={20} />
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

      <Price price={market_price} fallback={<div className="skeleton-text" />}>
        <PriceSummary
          market_price={market_price as string}
          priceSuffix={priceSuffix}
          buyProfit={buyProfit}
          sellProfit={sellProfit}
          iGetFromCurrentPrice={iGetFromCurrentMarketPrice}
        />
      </Price>

      {price_history ? (
        <Area data={price_history.prices} setNewPrice={setNewPrice} targetPrice={targetPrice} />
      ) : null}
    </li>
  );
}

export default UserItem;
